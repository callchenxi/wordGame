// pages/test/test.js
import expandTeam from '../../utils/expandTeam.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    us: Array(),
  },

  handleStart() {
    let mem = {"sid":10,"level":21,"bid":1,"didNow":0,"did":[0],"num":3,"inTeam":false};
    
    var abc = new Member();
    abc.createNewMem(6);
    abc.expandMember();
    console.log(abc);
    
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