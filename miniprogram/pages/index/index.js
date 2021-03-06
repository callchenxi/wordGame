// miniprogram/pages/index/index.js
import calcTimeReward from '../../utils/calcTimeReward.js';
import checkWordsEnd from '../../utils/checkWordsEnd.js';
import getExamWid from '../../utils/getExamWid.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    coin: -1,
    diamond: -1,
    msgTitle: "",
    msgContent: {},
    msgShow: false, 
  },

  // 获取挂机奖励
  handleGetReward() {
    let now = Date.now();    
    let last = wx.getStorageSync('hangDate');
    let reward = calcTimeReward(now, last);

    let title = '';
    let content = {};
    let coinReward = 0;
    let diamondReward = 0;

    // 设置弹窗内容
    if(reward.flag) {
      title = '挂机奖励';
      coinReward = reward.coinReward;
      diamondReward = reward.diamondReward;
      if(diamondReward == 0) {
        content.coin =  coinReward;
      } else {
        content.coin =  coinReward;
        content.diamond =  diamondReward;
      }
    } else {
      title = '暂无挂机奖励可领';
      content = ''
    };

    // 弹出奖励弹窗
    this.setData({
      msgTitle: title,
      msgContent: content,
      msgShow: true,
      coin: this.data.coin + coinReward,
      diamond: this.data.diamond + diamondReward,
    });
    // 700ms 后关闭提示框
    setTimeout(() => {
      this.setData({
        msgShow: false,
      })
    }, 700);
  },

  // 页面跳转
  handleToStudy() {
    let wid = wx.getStorageSync('studyWid') || 0;
    checkWordsEnd(wid);
  },

  handleToExam() {
    let wid = getExamWid();
    if(wid > -1) {
      wx.redirectTo({
        url: '../exam/exam?wid=' + wid,
      })
    }
  },

  handleToTeam() {
    wx.redirectTo({
      url: '../lineup/lineup',
    })
  },

  handleToRecruit() {
    wx.redirectTo({
      url: '../recruit/recruit',
    })
  },

  handleToDorm() {
    wx.redirectTo({
      url: '../dorm/dorm',
    })
  },

  handleToStory() {
    wx.redirectTo({
      url: '../story/story',
    })
  },

  // 生命周期函数--监听页面加载完成
  onLoad: function(options) {    
    // 判断是否有时间戳
    let last = wx.getStorageSync('hangDate');
    if(!last) {
      // 没有则记录时间戳,
      wx.setStorageSync('hangDate', Date.now()); 
    }

    // 读取storage里面的货币数量
    this.setData({
      coin: wx.getStorageSync('coin') || 0,
      diamond: wx.getStorageSync('diamond') || 0,
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})