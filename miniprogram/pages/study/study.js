// pages/study/study.js
import checkWordsEnd from '../../utils/checkWordsEnd.js';
import splitEn from '../../utils/splitEn.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: undefined,
  },

  handleKnow() {
    let wid = parseInt(wx.getStorageSync('studyWid')) + 1;
    checkWordsEnd(wid);    
  },

  // 生命周期函数--监听页面加载完成
  onLoad: function(options) {
    // 获取页面需要加载的单词
    let words = require('../../data/words.js').wordsJson;
    wx.setStorageSync('studyWid', options.wid);
    this.setData({
      // 调用接口3分割例句, 分离出目标单词
      word: splitEn(words[options.wid]),
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