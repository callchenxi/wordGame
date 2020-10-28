// miniprogram/pages/lineup/lineup.js
import showMyMems from '../../utils/showMyMems.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    students: Array(),
    team: Array(),
    currentIndex: 0,
    moveStyle: '',
    exchangeStyle: '',
  },

  handleExchange(e) {
    const pos = new Object();
    pos.x = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
    pos.y = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      exchangeStyle: 'left:' + pos.x + 'px; top:' + pos.y + 'px; transform: translate(-50%,-50%);z-index: 999'
    })
  },

  handleExchangeEnd(e) {
    this.setData({
      exchangeStyle: ''
    })
    const pos = new Object();
    pos.x = e.changedTouches[0].pageX;
    pos.y = e.changedTouches[0].pageY;

    // 判断移到哪一个上面了,替换它
    const query = wx.createSelectorQuery();
    query.selectAll('.team').boundingClientRect((res) => {
      // 判断y轴是否符合
      if(pos.y > res[0].top && pos.y < res[0].bottom) {
        for(let i = 0; i < 5; i++) {
          // 逐个判断x轴是否符合
          if(pos.x > res[i].left && pos.x < res[i].right) {
            let newMember = this.data.team[e.currentTarget.dataset.index];
            this.data.team[e.currentTarget.dataset.index] = this.data.team[i];
            this.data.team[i] = newMember;
            this.setData({
              team: this.data.team
            })
            wx.setStorageSync('team', this.data.team);
          }
        }
      }      
    })
    query.exec();
  },  

  handleMove(e) {
    const pos = new Object();
    pos.x = e.changedTouches[0].pageX - e.currentTarget.offsetLeft;
    pos.y = e.changedTouches[0].pageY - e.currentTarget.offsetTop;
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      moveStyle: 'left:' + pos.x + 'px; top:' + pos.y + 'px; transform: translate(-50%,-50%);z-index: 999'
    })
  },

  handleMoveEnd(e) {
    this.setData({
      moveStyle: ''
    })
    const pos = new Object();
    pos.x = e.changedTouches[0].pageX;
    pos.y = e.changedTouches[0].pageY;

    // 判断移到哪一个上面了,替换它
    const query = wx.createSelectorQuery();
    query.selectAll('.team').boundingClientRect((res) => {
      // 判断y轴是否符合
      if(pos.y > res[0].top && pos.y < res[0].bottom) {
        for(let i = 0; i < 5; i++) {
          // 逐个判断x轴是否符合
          if(pos.x > res[i].left && pos.x < res[i].right) {
            let newMember = this.data.students[e.currentTarget.dataset.index]
            // 判断是否已在队伍内
            for(let j = 0; j < 5; j++) {
              if(newMember.sid == this.data.team[j].sid) {
                this.data.team[j] = this.data.team [i];
              }
            }
            this.data.team[i] = newMember;
            this.setData({
              team: this.data.team
            })
            wx.setStorageSync('team', this.data.team);
          }
        }
      }      
    })
    query.exec();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取学员数据
    let students = showMyMems();
    if(wx.getStorageSync('team')) {
      this.data.team = wx.getStorageSync('team');
    } else {
      this.data.team = [{},{},{},{},{}];
      for(let i in students) {
        this.data.team[i] = students[i]
      }
    }

    this.setData({
      students: students,
      team: this.data.team
    })  
    wx.setStorageSync('team', this.data.team);
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