// miniprogram/pages/story/story.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floor: Array(4),
    towers: [
      '懒惰之塔 Laziness', '拖延之塔 Procrastination', '放弃之塔 Giving up', '马虎之塔 Carelessness'
    ]
  },

  handleFight(e) {    
    let rid = e.currentTarget.dataset.index;
    let floor = this.data.floor[rid];
    wx.navigateTo({
      url: '../battle/battle?rid=' + rid + '&floor=' + floor,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      floor: wx.getStorageSync('floor') || [1, 1, 1, 1]
    })
    wx.setStorageSync('floor', this.data.floor)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})