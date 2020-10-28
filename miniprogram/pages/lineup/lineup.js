// miniprogram/pages/lineup/lineup.js
import expandTeam from '../../utils/expandTeam.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTeam: Array(),
    hpSum: 0,
    atkSum: 0,
    defSum: 0,
  },

  handleReflash() {  
    this.setData({
      showTeam: expandTeam()
    })
    this.calcPropsAni()
  },

  calcPropsAni() {
    let oldHp = this.data.hpSum;
    let oldAtk = this.data.atkSum;
    let oldDef = this.data.defSum;

    let hpSum = 0;
    let atkSum = 0;
    let defSum = 0;

    for(let member of this.data.showTeam) {
      hpSum += member.props.hp;
      atkSum += member.props.atk;
      defSum += member.props.def;
    }

    // Hp变化动画
    let timerHp = setInterval(() => {
      if(oldHp == hpSum) {
        clearInterval(timerHp);
      } else if(oldHp > hpSum) {
        oldHp -= 20;
      } else {
        oldHp += 20;
      }  
      this.setData({
        hpSum: oldHp
      })
    }, 5);

    // Atk变化动画
    let timerAtk = setInterval(() => {
      if(oldAtk == atkSum) {
        clearInterval(timerAtk);
      } else if(oldAtk > atkSum) {
        oldAtk -= 2;
      } else {
        oldAtk += 2;
      }  
      this.setData({
        atkSum: oldAtk
      })
    }, 5);

    // Def变化动画
    let timerDef = setInterval(() => {
      if(oldDef == defSum) {
        clearInterval(timerDef);
      } else if(oldDef > defSum) {
        oldDef -= 2;
      } else {
        oldDef += 2;
      }  
      this.setData({
        defSum: oldDef
      })
    }, 5);

    this.setData({
      atkSum,
      defSum,
    })
  },

  calcProps() {
    let hpSum = 0;
    let atkSum = 0;
    let defSum = 0;

    for(let member of this.data.showTeam) {
      hpSum += member.props.hp;
      atkSum += member.props.atk;
      defSum += member.props.def;
    }

    this.setData({
      hpSum,
      atkSum,
      defSum
    })
  },

  onLoad(options) {    
    this.setData({
      showTeam: expandTeam()
    })
    this.calcProps()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})