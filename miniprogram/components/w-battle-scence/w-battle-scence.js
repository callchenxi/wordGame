// components/w-battle-scence/w-battle-scence.js
import getRandomInt from '../../utils/getRandomInt.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    us: {
      type: Array,
    },
    enemy: {
      type: Array,
      value: {
        'name': '',
        'pic': 'https://patchwiki.biligame.com/images/sssj/d/df/pde4aj5ih12vne1b6t5hprh75fsexlq.png',
        'hp' : 16999,
        'atk' : 1000
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    usAttack: Array(5),
    enAttack: '',
    usHp: 0,
    usMaxHp: 0,
    enHp: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleFight() {
      let count = 0;
      let usLength = this.properties.us.length;
      let enemyLength = 1;
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
          return;
        }

        if(count < usLength) {
          // 我方攻击动画
          this.data.usAttack[count] = 'attack';
          this.setData({
            usAttack: this.data.usAttack
          })
          // 战斗数值计算
          let atk = this.properties.us[count].props.atk;
          atk = getRandomInt(atk * 0.8, atk * 1.2)
          this.setData({
            enHp: this.data.enHp - atk < 0 ? 0 : this.data.enHp - atk
          })
          count ++;
        } else if(count < usLength + enemyLength) {
          // 敌方攻击动画
          this.setData({
            enAttack: 'attack'
          })
          // 战斗数值计算
          let atk = this.properties.enemy.atk;
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
            enAttack: '',
          })
        } 
      }, 300);
    }
  },

  lifetimes: {
    ready() {
      for(let mem of this.properties.us) {
        this.data.usMaxHp += mem.props.hp;
      }
      this.setData({
        usHp: this.data.usMaxHp,
        usMaxHp: this.data.usMaxHp,
        enHp: this.properties.enemy.hp
      })
    }
  }
})
