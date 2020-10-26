// pages/recruit/recruit.js
import getRandomInt from "../../utils/getRandomInt.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardSrc: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1199103174,3548828166&fm=26&gp=0.jpg',
    cardStyle: 'opacity: 0',
    btnHid: true,
    maskHid: true,
    nineShow: false,
    getSid: Array(),
    cardsNine: Array(9),
  },

  handleOne() {
    this.data.getSid = new Array();
    let str = 'opacity: 1;transform: scale(1.25); transition: opacity 0.6s, transform 1s';
    this.setData({
      maskHid: false,
      cardStyle: str,
    })
    setTimeout(async() => {
      await this.tapToTurn();
      this.setData({        
        btnHid: false
      })
    }, 1200)
    
  },

  async handleNine() {    
    this.data.getSid = new Array();
    this.setData({
      maskHid: false,
      nineShow: true,
    })
    await this.tapAllTurn()
    this.setData({
      btnHid: false,
    })
  },
 
  handleConfirm() {
    for(let sid of this.data.getSid) {
      console.log(sid);
    }
    this.setData({
      cardSrc: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1199103174,3548828166&fm=26&gp=0.jpg',
      cardStyle: 'opacity: 0',
      btnHid: true,
      maskHid: true,
      nineShow: false,
    })    
  },

  tapToTurn() {
    let str = 'transform-style: perserve-3d; transform: rotate3d(0, 1, 0, 85deg) scale(1.25); transition: all .8s'
    this.setData({
      cardStyle: str,
    })
    return new Promise ((resolve, reject) => {
      setTimeout(()=>{
        str = 'transform-style: perserve-3d; transform: rotate3d(0, 1, 0, 180deg) scale(1.25); transition: all .8s'
        let sid = getRandomInt(0, 11);
        this.data.getSid.push(sid)
        let students = require('../../data/students.js').studentsJson;
        let src = students[sid].pic;
        this.setData({
          cardStyle: str,      
          cardSrc: src,        
        })        
        resolve('ok');
      }, 800)
    })
  },

  tapAllTurn() {
    const cards = this.data.cardsNine
    for(let i in cards) {
      cards[i] = new Object();
      let sid = getRandomInt(0, 11);
      this.data.getSid.push(sid);
      let students = require('../../data/students.js').studentsJson;
      cards[i].src = students[sid].pic;
    }
    this.setData({
      cardsNine: cards
    })

    return new Promise ((resolve, reject) => {
      let count = 0
      let timer = setInterval(()=>{
        if(count >= 9) {
          clearInterval(timer);
          resolve('ok');
        }
        cards[count].style = 'opacity: 0; transition: all ease-in 1s';
        this.setData({
          cardsNine: cards
        })
        count ++
      }, 500)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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