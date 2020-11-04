// miniprogram/pages/battle/battle.js
import expandTeam from '../../utils/expandTeam.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    coin: -1,
    diamond: -1,
    coinAdd: 0,
    diamondAdd: 0,
    medalAdd: 0,
    msgTitle: "",
    msgContent: Object,
    msgShow: false,
    isFight: false,
    us: Array(),
  },

  // 从w-slot-machine组件中获取奖励信息
  getWealth(event) {
    this.setData({
      coinAdd: event.detail.coin,
      diamondAdd: event.detail.diamond,
      medalAdd: event.detail.medal,
      msgContent: event.detail.content,
    })  
  },

  isWin(event) {
    clearInterval(timer);
    let timer = setInterval(() => {
      if(Object.keys(this.data.msgContent).length != 0) {
        clearInterval(timer);
        if(event.detail.isWin) {
          this.setData({
            coin: this.data.coin + this.data.coinAdd,
            diamond: this.data.diamond + this.data.diamondAdd,
          })
          let medal = wx.getStorageSync('medal') || 0;
          medal += this.data.medalAdd;
          // coin,diamond 不用进行setStorageSync操作
          // 因为w-wealth-box组件的监听函数里操作了
          wx.setStorageSync('medal', medal)
          // 胜利时弹窗
          setTimeout(() => {
            this.setData({
              msgTitle: 'Victory',
              msgShow: true,
            })
          }, 500)
        } else {
          // 失败时弹窗
          setTimeout(() => {
            this.setData({
              msgTitle: 'Fail',
              msgContent: {'txt': '无法获得战利品'},
              msgShow: true,
            })
          }, 500)
        }
      }
    }, 500)  
  },

  handleStart() {
    this.setData({
      isFight: true,
    })
    const battleCpn = this.selectComponent('#battle');
    const rewardCpn = this.selectComponent('#reward');
    battleCpn.handleFight();
    rewardCpn.handlePlay();    
  },

  handleToIndex() {
    wx.redirectTo({
      url: '../index/index',
    })
  },

  onLoad: function(option) {
    this.setData({
      coin: wx.getStorageSync('coin') || 0,
      diamond: wx.getStorageSync('diamond') || 0,
      us: expandTeam()
    })
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})