// miniprogram/pages/battle/battle.js
import expandTeam from '../../utils/expandTeam.js';
import getRandomInt from '../../utils/getRandomInt';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _rid: -1,
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
    enemy: Array(),
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
  // 判断胜负奖励
  isWin(event) {
    if(event.detail.isWin) {
      clearInterval(timer);
      // 获胜时需等待奖励结果
      let timer = setInterval(() => {
        if(Object.keys(this.data.msgContent).length != 0) {
          clearInterval(timer);
          this.setData({
            coin: this.data.coin + this.data.coinAdd,
            diamond: this.data.diamond + this.data.diamondAdd,
          })
          let medal = wx.getStorageSync('medal') || 0;
          medal += this.data.medalAdd;
          // coin,diamond 不用进行setStorageSync操作
          // 因为w-wealth-box组件的监听函数里操作了
          wx.setStorageSync('medal', medal);
          // 楼层+1
          let floor = wx.getStorageSync('floor');
          floor[this.data._rid] += 1;
          wx.setStorageSync('floor', floor);
          // 胜利时弹窗
          setTimeout(() => {
            this.setData({
              msgTitle: 'Victory',
              msgShow: true,
            })
          }, 500)
        }
      }, 500)
    } else {
      // 失败时不用等待奖励结果
      // 失败时弹窗
      setTimeout(() => {
        this.setData({
          msgTitle: 'Fail',
          msgContent: {'txt': '无法获得战利品'},
          msgShow: true,
        })
      }, 500)
    }
  },
  // 开始战斗+抽奖
  handleStart() {
    this.setData({
      isFight: true,
    })
    const battleCpn = this.selectComponent('#battle');
    const rewardCpn = this.selectComponent('#reward');
    battleCpn.handleFight();
    rewardCpn.handlePlay();
  },
  // 战果弹窗的确定按钮事件
  handleToIndex() {
    wx.reLaunch({
      url: '../story/story',
    })
  },
  // 设置boss属性
  setBoss(option) {
    let boss = require('../../data/boss.js').bossJson;
    let boid = getRandomInt(0, boss.length - 1);
    let enemy = boss[boid];
    enemy.rid = option.rid;
    enemy.props.hp = enemy.props.hp + enemy.props.hpRate * (option.floor-1) * 5;
    enemy.props.hp = Math.round(enemy.props.hp);
    enemy.props.atk = enemy.props.atk + enemy.props.atkRate * (option.floor-1) * 5;
    enemy.props.atk = Math.round(enemy.props.atk);
    enemy.props.def = enemy.props.def + enemy.props.defRate * (option.floor-1) * 5;
    enemy.props.def = Math.round(enemy.props.def);
    this.setData({
      enemy: boss[boid]
    })
  },

  onLoad: function(option) {
    this.setData({
      coin: wx.getStorageSync('coin') || 0,
      diamond: wx.getStorageSync('diamond') || 0,
      us: expandTeam()
    })
    this.data._rid = option.rid;
    this.setBoss(option);
    // 1s后自动开始战斗
    setTimeout(() => {
      this.handleStart()
    }, 1200)
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})