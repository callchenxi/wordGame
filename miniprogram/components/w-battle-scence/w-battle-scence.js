// components/w-battle-scence/w-battle-scence.js
import getRandomInt from '../../utils/getRandomInt.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    us: {
      type: Array,
      value: [{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/9/95/ab5eoqawxe8hf3sf4d6avzx9wu1us6w.png',
        'atk' : 100
      },{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/3/35/ducyysdxl23z8y5obslz1b7729ha7kj.png',
        'atk' : 100
      },{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/2/29/f46weht7m1l1tvawbn7fkap6kyzjz55.png',
        'atk' : 100
      },{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/9/9f/6luzyxgjl1uwjmfngaxki7ke4gbdiqc.png',
        'atk' : 100
      },{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/5/51/sfqsxim6ugipecled56ynz46se5ve80.png',
        'atk' : 100
      }]
    },
    enemies: {
      type: Array,
      value: [{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/f/f6/tpi3kpr7lhkstrv4ka70cyyqy2t3nu7.png',
        'atk' : 100
      },{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/f/f6/tpi3kpr7lhkstrv4ka70cyyqy2t3nu7.png',
        'atk' : 100
      },{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/f/f6/tpi3kpr7lhkstrv4ka70cyyqy2t3nu7.png',
        'atk' : 100
      },{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/f/f6/tpi3kpr7lhkstrv4ka70cyyqy2t3nu7.png',
        'atk' : 100
      },{
        'name': '',
        'picH': 'https://patchwiki.biligame.com/images/sssj/f/f6/tpi3kpr7lhkstrv4ka70cyyqy2t3nu7.png',
        'atk' : 100
      }]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    usAttack: Array(5),
    enAttack: Array(5),
    usHp: 3000,
    enHp: 3000,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleFight() {
      let count = 0;
      clearInterval(timer);
      let timer = setInterval(() => {
        // 判断血量是否为0
        if(this.data.enHp == 0 || this.data.usHp == 0) {
          clearInterval(timer);
          let isWin = true;
          if(this.data.usHp == 0) {
            isWin = false
          }
          // 将战果发送给父组件
          this.triggerEvent('isWin', {isWin}, {});
        }

        if(count < 5) {
          // 我方攻击动画
          this.data.usAttack[count] = 'attack';
          this.setData({
            usAttack: this.data.usAttack
          })
          // 战斗数值计算
          let atk = this.properties.us[count].atk;
          atk = getRandomInt(atk * 0.8, atk * 1.2)
          this.setData({
            enHp: this.data.enHp - atk < 0 ? 0 : this.data.enHp - atk
          })

          count ++;
        } else if(count < 10) {
          // 敌方攻击动画
          this.data.enAttack[count - 5] = 'attack';
          this.setData({
            enAttack: this.data.enAttack
          })
          // 战斗数值计算
          let atk = this.properties.enemies[count - 5].atk;
          atk = getRandomInt(atk * 0.8, atk * 1.2)
          this.setData({
            usHp: this.data.usHp - atk < 0 ? 0 : this.data.usHp - atk
          })

          count ++;
        } else {
          // 敌我都攻击完一轮后...
          count = 0;
          this.setData({
            usAttack: Array(5),
            enAttack: Array(5),
          })
        } 
      }, 300);
    }
  }
})
