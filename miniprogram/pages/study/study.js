// pages/study/study.js
import checkWordsEnd from '../../utils/checkWordsEnd.js';
import splitEn from '../../utils/splitEn.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: undefined,
    msgTitle: 'Fighting (ง •̀_•́)ง',
    msgContent: {
      coin: 100,
      diamond: 10,
    },
    msgShow: false,
    coin: -1,
    diamond: -1,
  },

  // 认识 RAID 3
  handleKnow() {
    const RAID = 3;
    this.treatment(RAID);  
  },

  // 模糊 RAID 6
  handleVague() {
    const RAID = 6;
    this.treatment(RAID); 
  },

  // 模糊 RAID 9
  handleStrange() {
    const RAID = 9;
    this.treatment(RAID);
  },

  // 对结果进行处理和存储
  treatment(raid) {
    let learned = wx.getStorageSync('learned') || [];
    let wid = this.data.word.wid;
    learned.push({wid, raid});
    wx.setStorageSync('learned', learned);
    wid += 1;
    wx.setStorageSync('studyWid', wid);
    this.setData({
      coin: this.data.coin + this.data.msgContent.coin,
      diamond: this.data.diamond + this.data.msgContent.diamond,
      msgShow: true,
    })
    setTimeout(() => {
      checkWordsEnd(wid);
    }, 500)
  },

  // 生命周期函数--监听页面加载完成
  onLoad: function(options) {
    // 获取页面需要加载的单词
    let words = require('../../data/words.js').wordsJson;
    wx.setStorageSync('studyWid', options.wid);
    this.setData({
      // 调用接口3分割例句, 分离出目标单词
      word: splitEn(words[options.wid]),
      coin: wx.getStorageSync('coin') || 0,
      diamond: wx.getStorageSync('diamond') || 0,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})