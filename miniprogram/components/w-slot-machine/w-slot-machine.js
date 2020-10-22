// components/w-slot-machine/w-slot-machine.js
import getRandomInt from '../../utils/getRandomInt.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    leftTop: '',
    centerTop: '',
    rightTop: '',
    timers: Object,
    isGo: true,
    isSlow: false,
    coin: wx.getStorageSync('coin') || 0,
    diamond: wx.getStorageSync('diamond') || 0,
    msgTitle: "",
    msgContent: {},
    msgShow: false, 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setNewTop(now, max, min, step) {
      // 判断到底部了则回到头部,保证能不停转动
      if(now <= max) {
        now = min;
      }
      step = step || (max - now)/10;      
      // step为正则向上取整,为负则向下取整
      now += step>0 ? Math.ceil(step) : Math.floor(step);
      return now;
    },

    openTreasure(rewards) {
      let ran = getRandomInt(0, rewards[3]);
      // 重新声明一个新的变量treasure, 
      // 防止指针操作时会影响到rewards中的值
      const treasure = [0, 0, 0, 0];
      if(ran >= 9) {
        treasure[3] = 1;
        treasure[0] = getRandomInt(6, 9);
        treasure[1] = getRandomInt(6, 9);
        treasure[2] = getRandomInt(6, 9);
        return treasure;
      } else if(ran >= 4) {
        treasure[3] = 0;
        treasure[0] = getRandomInt(3, 6); 
        treasure[1] = getRandomInt(3, 6); 
        treasure[2] = getRandomInt(3, 6);
        return treasure;
      } else {
        treasure[3] = 0;
        treasure[0] = getRandomInt(0, 3);
        treasure[1] = getRandomInt(0, 3);
        treasure[2] = getRandomInt(0, 3);
        return treasure;
      }
    },

    calcRewards(ridL, ridC, ridR) {
      const rewards = [0, 0, 0, 0];
      const COIN_RAID = 100;
      const DIAMOND_RAID = 10;
      const MEDAL_RAID = 1;

      let treasure = [0, 0, 0, 0];
      let str = '';
      const content = {}; // 奖励弹窗的content
      rewards[ridL] += 1;
      rewards[ridC] += 1;
      rewards[ridR] += 1;
      for(let i in rewards) {
        if(rewards[i] == 3) {
          rewards[i] = Math.pow(9, 2);
        } else if(rewards[i] == 2) {
          rewards[i] = Math.pow(3, 2);
        }
        // 打印奖励
        if(rewards[i] > 0) {
          switch(i) {          
            case '0':
              str += '金币:'  + rewards[i] * COIN_RAID + '  ';
              content.coin = rewards[i] * COIN_RAID;
              break;
            case '1': 
              str += '钻石:'  + rewards[i] * DIAMOND_RAID + '  ';
              content.diamond = rewards[i] * DIAMOND_RAID;
              break;
            case '2':
              str += '奖牌:'  + rewards[i] * MEDAL_RAID + '  ';
              content.medal = rewards[i] * MEDAL_RAID;
              break;
            case '3':
              content.treasure = {};
              content.treasure.num = Math.sqrt(rewards[i]);
              // 开宝箱
              treasure = this.openTreasure(rewards);
              // 打印宝箱奖励
              str += '\r\n宝箱('
              for(let i in treasure) {
                if(treasure[i] > 0) {
                  switch(i) {          
                    case '0':
                      str += '金币:'  + treasure[i] * COIN_RAID + '  ';
                      content.treasure.coin = treasure[i] * COIN_RAID;
                      break;
                    case '1': 
                      str += '钻石:'  + treasure[i] * DIAMOND_RAID + '  ';
                      content.treasure.diamond = treasure[i] * DIAMOND_RAID;
                      break;
                    case '2':
                      str += '奖牌:'  + treasure[i] * MEDAL_RAID + '  ';
                      content.treasure.medal = treasure[i] * MEDAL_RAID;
                      break;
                    case '3': 
                      str += '\r\n获得隐藏学员';
                      break;
                  }
                }
              }
              str += ')';
              break;
          }
        }
      }
      
      // 更新货币,背包
      this.setData({
        coin: this.data.coin + (rewards[0] + treasure[0]) * COIN_RAID,
        diamond: this.data.diamond + (rewards[1] + treasure[1]) * DIAMOND_RAID,
        // coin: this.data.coin + content.coin + content.treasure.coin,
        // diamond: this.data.diamond + content.diamond + content.treasure.diamond,
      })
      let medal = wx.getStorageSync('medal') || 0;
      medal += (rewards[2] + treasure[2]) * MEDAL_RAID
      // medal += content.medal + content.treasure.medal;
      wx.setStorageSync('medal', medal);

      // 弹出奖励弹窗
      this.setData({
        msgTitle: '最终奖励',
        msgContent: content,
        msgShow: true,
      })
      // 700ms 后关闭提示框
      setTimeout(() => {
        this.setData({
          msgShow: false,
        })
      }, 3000);
      console.log(str);  
    },

    handlePlay() {
      this.setData({
        isGo: false,
        isSlow: false
      })
      
      clearInterval(this.data.timers.timer1);
      clearInterval(this.data.timers.timer2);
      clearInterval(this.data.timers.timer3);
      clearInterval(this.data.timers.timer4);
      clearInterval(this.data.timers.timer5);

      const ORIGIN = -60, TOPSPEED = 120;
      let maxHeight = ORIGIN - 120 * 4;
      let leftTop = ORIGIN, centerTop = ORIGIN, rightTop = ORIGIN;
      let stepL = -10, stepC = -10, stepR = -10;

      // 随机出停止的位置
      let ranL = getRandomInt(0,3), ranC = getRandomInt(0,3), ranR = getRandomInt(0,3);
      let numL = ORIGIN - 120 * ranL;
      let numC = ORIGIN - 120 * ranC;
      let numR = ORIGIN - 120 * ranR;

      // 停止标识符
      let stopL = false, stopC = false, stopR = false;

      // 目前缺陷: 减速时可能加速度大于5,感觉不好
      // 左部窗口滚动
      this.data.timers.timer1 = setInterval(() => {
        leftTop = this.setNewTop(leftTop, maxHeight, ORIGIN, stepL);        
        this.setData({
          leftTop: 'top:' + leftTop + 'rpx;',
        });
        if(!this.data.isSlow) {
          // 当无减速标志, 且未达到最高速时, 则加速
          if(stepL > -TOPSPEED) {
            stepL -= 5;
          }
        } else {
          // 当有减速标志时, 则开始减速到 speed值
          let speed = (numL - ORIGIN) / 10;
          if(stepL < speed) {
            stepL += 5;
          } else if(leftTop <= maxHeight) {
            // 减速到达阈值 且 回到了起点 则开始通过定时器 慢慢减速至目标位置并停下
            clearInterval(this.data.timers.timer1);
            this.data.timers.timer1 = setInterval(() => {
              leftTop = this.setNewTop(leftTop, numL, ORIGIN);
              this.setData({
                leftTop: 'top:' + leftTop + 'rpx;'
              })
              // 到目标位置后, 清除定时器, 修改结束标识符
              if(leftTop == numL) {
                stopL = true;
                clearInterval(this.data.timers.timer1);
              }
            }, 90)
          }
        }
      }, 100)

      // 中部窗口滚动
      this.data.timers.timer2 = setInterval(() => {        
        centerTop = this.setNewTop(centerTop, maxHeight, ORIGIN, stepC);
        this.setData({
          centerTop: 'top:' + centerTop + 'rpx;',
        })
        if(!this.data.isSlow) {
          // 当无减速标志, 且未达到最高速时, 则加速
          if(stepC > -TOPSPEED) {
            stepC -= 5;
          }
        } else {
          // 当有减速标志时, 则开始减速到 speed值
          let speed = (numC - ORIGIN) / 10;
          if(stepC < speed) {
            stepC += 5;
          } else if(centerTop <= maxHeight) {
            // 减速到达阈值 且 回到了起点 则开始通过定时器 慢慢减速至目标位置并停下
            clearInterval(this.data.timers.timer2);
            this.data.timers.timer2 = setInterval(() => {
              centerTop = this.setNewTop(centerTop, numC, ORIGIN);
              this.setData({
                centerTop: 'top:' + centerTop + 'rpx;'
              })
              // 到目标位置后, 清除定时器, 修改结束标识符
              if(centerTop == numC) {
                stopC = true;
                clearInterval(this.data.timers.timer2);
              }
            }, 90)
          }
        }  
      }, 90)

      // 右部窗口滚动
      this.data.timers.timer3 = setInterval(() => {
        rightTop = this.setNewTop(rightTop, maxHeight, ORIGIN, stepR);
        this.setData({
          rightTop: 'top:' + rightTop + 'rpx;'
        })

        if(!this.data.isSlow) {
          // 当无减速标志, 且未达到最高速时, 则加速
          if(stepR > -TOPSPEED) {
            stepR -= 5;
          }
        } else {
          // 当有减速标志时, 则开始减速到 speed值
          let speed = (numR - ORIGIN) / 10;
          if(stepR < speed) {
            stepR += 5;
          } else if(rightTop <= maxHeight) {
            // 减速到达阈值 且 回到了起点 则开始通过定时器 慢慢减速至目标位置并停下
            clearInterval(this.data.timers.timer3);
            this.data.timers.timer3 = setInterval(() => {
              rightTop = this.setNewTop(rightTop, numR, ORIGIN);
              this.setData({
                rightTop: 'top:' + rightTop + 'rpx;'
              })
              // 到目标位置后, 清除定时器, 修改结束标识符
              if(rightTop == numR) {
                stopR = true;
                clearInterval(this.data.timers.timer3);
              }
            }, 90)
          }
        }  
      }, 95) 

      // 5000ms后, 开启减速标志
      this.data.timers.timer4 = setTimeout(() => {
        this.data.isSlow = true;
      }, 5000)

      let count = 1
      // 确定都停止后,计算奖励
      this.data.timers.timer5 = setInterval(() => {
        console.log(count);
        count ++;
        if(stopL && stopC && stopR) {
          this.calcRewards(ranL, ranC, ranR);
          clearTimeout(this.data.timers.timer5);
          this.setData({
            isGo: true
          })
        }
      }, 1000)
    },
  }
})
