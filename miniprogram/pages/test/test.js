// pages/test/test.js
import expandTeam from '../../utils/expandTeam.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {  
    title: '加油 (ง •̀_•́)ง',
    content: {
      coin: 100,
      diamond: 10,
      medal: 999,
      treasure: {
        num: 1,
        coin: 2009,
        diamond: 9999,
        medal: 9999
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      us: expandTeam()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})