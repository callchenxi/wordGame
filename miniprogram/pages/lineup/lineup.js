// miniprogram/pages/lineup/lineup.js
import expandTeam from '../../utils/expandTeam.js';
import calcBuff from '../../utils/calcBuff.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTeam: Array(),
    hpSum: 0,
    atkSum: 0,
    defSum: 0,
    showBuff: Array(),
    arrow: [0, 0, 0],
    isReady: false,   //  通过该标记,使得第一次进入页面时无入队动画
  },

  handleRemove(e) {
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let myMembers = wx.getStorageSync('myMembers');
    for(let i in myMembers) {
      if(this.data.showTeam[index].sid == myMembers[i].sid) {
        index = i;
        break;
      }
    }
    this.selectComponent('.cpn-members').showInTeam(index);
    this.handleReflash();
  },

  handleReflash() {
    this.setData({
      showTeam: expandTeam()
    })
    this.setData({
      showBuff: calcBuff(this.data.showTeam)
    }) 
    this.calcProps();
  },

  calcPropsAni() {
    let arrow = [0, 0, 0];
    let oldHp = this.data.hpSum;
    let oldAtk = this.data.atkSum;
    let oldDef = this.data.defSum;
    this.calcProps()
    arrow[0] = this.getArrowDirect(this.data.hpSum, oldHp);
    arrow[1] = this.getArrowDirect(this.data.atkSum, oldAtk);
    arrow[2] = this.getArrowDirect(this.data.defSum, oldDef);
    this.setData({
      arrow
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

  getArrowDirect(newValue, oldValue) {
    if(newValue > oldValue) {
      return 1;
    } else if (newValue == oldValue) {
      return 0;
    } else {
      return -1;
    }
  },

  // 写在onLoad会卡, 写在onReady就不会
  onReady() {
    this.setData({
      showTeam: expandTeam(),
    })
    this.setData({
      showBuff: calcBuff(this.data.showTeam),
      isReady: true
    })

    this.calcProps()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})