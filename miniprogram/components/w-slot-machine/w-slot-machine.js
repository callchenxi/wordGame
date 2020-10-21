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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setNewTop(now, max, step) {
      step = step || (max - now)/10;      
      // step为正则向上取整,为负则向下取整
      now += step>0 ? Math.ceil(step) : Math.floor(step);
      return now;
    },

    handlePlay() {
      this.setData({
        isGo: false
      })
      let maxHeight = -60 - 120 * 4;
      let leftTop = -60;
      let centerTop = -60;
      let rightTop = -60;
      
      clearInterval(this.data.timers.timer1);
      clearInterval(this.data.timers.timer2);
      clearInterval(this.data.timers.timer3);
      clearInterval(this.data.timers.timer4);

      // 左部窗口滚动
      this.data.timers.timer1 = setInterval(() => {
        // 判断到底部了则回到头部,保证能不停转动
        if(leftTop == maxHeight) {
          leftTop = -60;
        }

        leftTop = this.setNewTop(leftTop, maxHeight, -120);
        this.setData({
          leftTop: 'top:' + leftTop + 'rpx;',
        });
      }, 100)

      // 中部窗口滚动
      this.data.timers.timer2 = setInterval(() => {
        // 判断到底部了则回到头部,保证能不停转动
        if(centerTop == maxHeight) {
          centerTop = -60;
        }

        centerTop = this.setNewTop(centerTop, maxHeight, -120);
        this.setData({
          centerTop: 'top:' + centerTop + 'rpx;',
        })
      }, 90)

      // 右部窗口滚动
      this.data.timers.timer3 = setInterval(() => {
        // 判断到底部了则回到头部,保证能不停转动
        if(rightTop == maxHeight) {
          rightTop = -60;
        }

        rightTop = this.setNewTop(rightTop, maxHeight, -120);
        this.setData({
          rightTop: 'top:' + rightTop + 'rpx;'
        })
      }, 110)
      
      
    },

    handleStop() {
      this.setData({
        isGo: true
      })  

      clearInterval(this.data.timers.timer1);
      clearInterval(this.data.timers.timer2);
      clearInterval(this.data.timers.timer3);
      clearInterval(this.data.timers.timer4);

      let numL = -60 - 120 * getRandomInt(0,3);
      let numC = -60 - 120 * getRandomInt(0,3);
      let numR = -60 - 120 * getRandomInt(0,3);
      let leftTop = 0, centerTop = 0, rightTop = 0;

      const query = this.createSelectorQuery()
      // 获取 左/中/右 各个窗口现在的top值
      query.select('#left').boundingClientRect(function(res) {
        leftTop = res.top;
      })
      query.select('#center').boundingClientRect(function(res) {
        centerTop = res.top;
      })
      query.select('#right').boundingClientRect(function(res) {
        rightTop = res.top;
      })

      this.data.timers.timer4 = setInterval(() => {
        // 都到位了则停止转动
        if(leftTop == numL && centerTop == numC && rightTop == numR) {
          clearInterval(this.data.timers.timer4);
        }

        leftTop = this.setNewTop(leftTop, numL);
        centerTop = this.setNewTop(centerTop, numC);
        rightTop = this.setNewTop(rightTop, numR);
        this.setData({
          leftTop: 'top:' + leftTop + 'rpx;',
          centerTop: 'top:' + centerTop + 'rpx;',
          rightTop: 'top:' + rightTop + 'rpx;'
        });
      }, 100)
    }
  }
})
