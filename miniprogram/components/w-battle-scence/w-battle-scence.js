// components/w-battle-scence/w-battle-scence.js
import getRandomInt from '../../utils/getRandomInt.js';
import calcBuff from '../../utils/calcBuff.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    us: {
      type: Array,
    },
    enemy: {
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 攻击动画的class
    usAttack: Array(5),
    enAttack: '',

    usHp: 0,
    usMaxHp: 0,
    usDef: 0,
    enHp: 0,
    damage: 0,
    flag: 0,
    buff: Array(),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleFight() {
      let count = 0;
      let usLength = this.properties.us.length;
      let enemyLength = 1;
      let buff = this.data.buff;
      clearInterval(timer);
      let timer = setInterval(() => {
        // 判断血量是否为0
        if(this.data.enHp == 0 || this.data.usHp == 0) {
          clearInterval(timer);
          this.setData({
            flag: 0
          })
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
            usAttack: this.data.usAttack,
            flag: 0,
          })
          // 战斗数值计算
          let atk = this.properties.us[count].props.atk;
          let def = this.properties.enemy.props.def;
          let damage = (atk * 5 - def) / 5;
          damage = damage * (1 + buff.increase / 100)
          damage = getRandomInt(damage * 0.8, damage * 1.2)
          damage = damage <= 0 ? 1 : damage;
          this.setData({
            enHp: this.data.enHp - damage < 0 ? 0 : this.data.enHp - damage,
            damage: damage,
            flag: 1,
          })
          count ++;
        } else if(count < usLength + enemyLength) {
          // 敌方攻击动画
          this.setData({
            enAttack: 'attack',
            flag: 0,
          })
          // 战斗数值计算
          let atk = this.properties.enemy.props.atk;
          let def = this.data.usDef;
          let damage = atk - def;
          damage = damage * (1 - buff.decrease / 100);
          damage = getRandomInt(damage * 0.8, damage * 1.2);
          damage = damage <= 0 ? 1 : damage;
          this.setData({
            usHp: this.data.usHp - damage < 0 ? 0 : this.data.usHp - damage,
            damage: damage,
            flag: -1,
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
        this.data.usDef += mem.props.def;
      }
      this.setData({
        usHp: this.data.usMaxHp,
        usMaxHp: this.data.usMaxHp,
        enHp: this.properties.enemy.props.hp,
        // 获取当前关卡的buff加层
        buff: calcBuff(this.properties.us)[this.properties.enemy.rid]
      })
    }
  }
})
