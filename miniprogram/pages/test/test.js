import showMyMems from '../../utils/showMyMems.js';

// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMyMembers: Array(),
    duration: 150,
    interval: 150,
    autoplay: false,
  },

  handleStart() {
    this.setData({
      duration: 1000,
      autoplay: true,
    })
    let duration = 1000
    let timer = setInterval(() => { 
      duration -= 50
      this.setData({
        duration
      })
      if(duration <= 500) {
        clearInterval(timer)
      }
    }, 100)
  },

  handleStop1() {
    let duration = 500;
    let timer = setInterval(() => { 
      duration += 50
      this.setData({
        duration
      })
      if(duration >= 5000) {
        clearInterval(timer)
        this.setData({
          autoplay: false,
        })
      }
    }, 100)
  },

  handleStop2() {
    this.setData({
            autoplay: false,
          })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let showMembers = showMyMems();
    this.setData({
      showMyMembers
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