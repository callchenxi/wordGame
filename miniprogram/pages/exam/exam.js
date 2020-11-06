// pages/exam/exam.js
import splitEn from '../../utils/splitEn.js';
import getExamWid from '../../utils/getExamWid.js';

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
    msgTitle: 'Bingo ヾ(≧▽≦*)o',
    msgContent: {
      coin: 100,
      diamond: 10,
    },
    msgShow: false,
    coin: -1,
    diamond: -1,
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
        // 更新learned
        this.updateLearned(this.data.word.wid);
        // 给与奖励
        this.setData({
          coin: this.data.coin + this.data.msgContent.coin,
          diamond: this.data.diamond + this.data.msgContent.diamond,
          msgShow: true,
        })
        // 跳转到下一个词(还未判断是否到最后一个)
        let wid = getExamWid();
        if(wid > -1) {
          setTimeout(() => {
            wx.redirectTo({      
              url: '../exam/exam?wid=' + wid,
            })
          }, 1100);
        }
      } else {
        // 回答错误
        wx.showToast({
          title: 'Wrong (＞﹏＜)',
          icon: 'none',
          mask: true,
          duration: 600,
        })
      }
    }    
  },
  
  // wid对应的单词的raid - 1 但 最小为1
  updateLearned(wid) {    
    let learned = wx.getStorageSync('learned');
    for(let item of learned) {
      if(item.wid == wid) {
        if(item.raid > 1) {
          item.raid --;
          wx.setStorageSync('learned', learned);
        }
        return;
      }
    }
  },

  // 生命周期函数--监听页面加载完成
  onLoad: function(options) {   
    // 获取页面需要加载的单词     
    let words = require('../../data/words.js').wordsJson;
    this.setData({
      // 调用接口3分割例句, 分离出目标单词
      word: splitEn(words[options.wid]),

      coin: wx.getStorageSync('coin') || 0,
      diamond: wx.getStorageSync('diamond') || 0,
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