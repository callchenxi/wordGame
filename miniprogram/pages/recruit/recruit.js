// pages/recruit/recruit.js
import getRandomInt from "../../utils/getRandomInt.js";
import Member from "../../class/Member.js";

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
    coin: -1,
    diamond: -1,
  },

  // 单抽按钮
  handleOne() {
    const COST = 150;
    if(this.data.diamond < COST) {
      wx.showToast({
        title: '钻石不足',
        icon: 'none',
        duration: 700,
        mask: true,
      })
      return;
    }
    this.data.getSid = new Array();
    let str = 'animation: 1.5s ease-out shining; opacity: 1;transform: scale(1.25); transition: opacity 0.6s, transform 1s';
    this.setData({
      maskHid: false,
      cardStyle: str,
      diamond: this.data.diamond - COST,
    })
    setTimeout(async() => {
      // 单抽结果+动画
      await this.tapToTurn();
      this.setData({        
        btnHid: false
      })
    }, 1200)
    
  },

  // 九连按钮
  async handleNine() {    
    const COST = 1200;
    if(this.data.diamond < COST) {
      wx.showToast({
        title: '钻石不足',
        icon: 'none',
        duration: 700,
        mask: true,
      })
      return;
    }
    this.data.getSid = new Array();
    this.setData({
      maskHid: false,
      nineShow: true,
      diamond: this.data.diamond - COST,
    })
    // 九连结果+动画
    await this.tapAllTurn()
    this.setData({
      btnHid: false,
    })
  },

  // 确定按钮
  handleConfirm() {
    this.setData({
      cardSrc: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1199103174,3548828166&fm=26&gp=0.jpg',
      cardStyle: 'opacity: 0',
      btnHid: true,
      maskHid: true,
      nineShow: false,
    })    
  },

  // 单抽结果+动画
  tapToTurn() {
    let str = 'transform-style: perserve-3d; transform: rotate3d(0, 1, 0, 85deg) scale(1.25); transition: all .8s'
    this.setData({
      cardStyle: str,
    })
    return new Promise ((resolve, reject) => {
      setTimeout(()=>{
        str = 'transform-style: perserve-3d; transform: rotate3d(0, 1, 0, 180deg) scale(1.25); transition: all .8s'
        let sid = getRandomInt(0, 12);
        this.data.getSid.push(sid)
        // 存储抽卡结果
        this.storeRes(this.data.getSid);
        let students = require('../../data/students.js').studentsJson;
        let src = students[sid].dress[0].pic;
        this.setData({
          cardStyle: str,      
          cardSrc: src,        
        })        
        resolve('ok');
      }, 800)
    })
  },

  // 九连结果+动画
  tapAllTurn() {
    const cards = this.data.cardsNine
    for(let i in cards) {
      cards[i] = new Object();
      let sid = getRandomInt(0, 12);
      this.data.getSid.push(sid);
      let students = require('../../data/students.js').studentsJson;
      cards[i].src = students[sid].dress[0].pic;
    }
    // 存储抽卡结果
    this.storeRes(this.data.getSid);
    this.setData({
      cardsNine: cards
    })

    return new Promise ((resolve, reject) => {
      let count = 0
      let timer = setInterval(()=>{  
        cards[count].style = 'opacity: 0; transition: all ease-in 2s';
        this.setData({
          cardsNine: cards
        })
        count ++;
        if(count >= 9) {
          clearInterval(timer);
          resolve('ok');
        }
      }, 500)
    })
  },

  // 记录抽卡结果
  storeRes(res) {
    let myMembers = wx.getStorageSync('myMembers') || []
    for(let sid of res) {
      if(myMembers.length == 0) {
        let mem = new Member();
        mem.createNewMem(sid);
        myMembers.push(mem);
      } else {
        // 做个flag标记,判断是否已有该卡
        let flag = false;
        for(let member of myMembers) {
          if(member.sid == sid) {
            flag = true;
            member.num ++;
            break;
          }
        }
        if(!flag) {
          let mem = new Member();
          mem.createNewMem(sid);
          myMembers.push(mem);       
        }
      }
    }
    wx.setStorageSync('myMembers', myMembers);
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取storage里面的货币数量
    this.setData({
      coin: wx.getStorageSync('coin') || 0,
      diamond: wx.getStorageSync('diamond') || 0,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})