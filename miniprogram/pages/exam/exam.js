// pages/exam/exam.js
import splitEn from '../../utils/splitEn.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iptShow: false,
    boxShow: true,
    phsShow: false,
    blank: '_',
    answer: '',
    maxLength: 0,
    word: undefined,    
  },

  handleShowPhs() {
    this.setData({
      phsShow: true,
    })
  },

  handleShowIpt() {
    this.setData({
      boxShow: false,
      iptShow: true,
    })
  },

  handleHideIpt() {
    this.setData({
      boxShow: true,
      iptShow: false,
    })
  },

  handleWriteWord(e) {
    let str = e.detail.value;
    let rep = new RegExp('^.{' + str.length + '}');  
    
    // 将answer重新赋值为全是下划线, 这是为了兼容退格操作
    this.data.answer = this.data.blank;
    this.setData({
      // 通过正则rep,根据输入的值替换下划线
      answer: this.data.answer.replace(rep, str),
    })

    // _位数全填满后判断对错
    if(str.length == this.data.maxLength) {
      if(this.data.answer == this.data.word.spelling) {
        // 回答正确
        wx.showToast({
          title: '回答正确',
          mask: true,
          duration: 1000,
        });
        // 跳转到下一个词(还未判断是否到最后一个)
        let wid = parseInt(wx.getStorageSync('examWid')) + 1;
        setTimeout(() => {
          wx.redirectTo({      
            url: '../exam/exam?wid=' + wid,
          })
        }, 1100);
      } else {
        // 回答错误
        wx.showToast({
          title: '回答错误 (＞﹏＜)',
          icon: 'none',
          mask: true,
          duration: 600,
        })
      }
    }    
  },

  // 生命周期函数--监听页面加载完成
  onLoad: function(options) {   
    // 获取页面需要加载的单词     
    let words = require('../../data/words.js').wordsJson;
    wx.setStorageSync('examWid', options.wid);
    this.setData({
      // 调用接口3分割例句, 分离出目标单词
      word: splitEn(words[options.wid]),
    })

    // 将目标单词替换为下划线
    let str = ''
    for(let i in this.data.word.spelling) {
      str += '_'
    }
    this.setData({
      blank: str,
      answer: str,
      maxLength: str.length,
    })    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})