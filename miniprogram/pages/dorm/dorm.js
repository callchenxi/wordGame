// pages/dorm/dorm.js
import expandMember from '../../utils/expandMember.js';
import setMyMem from '../../utils/setMyMem.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coin: -1,
    diamond: -1,
    members: Array(),
    mem: Object(),
    expandMem: Object(),
    dress: Array(),
    aniPlay: false,
  },

  handleReflash(event) {    
    this.setData({
      aniPlay: false,
      mem: event.detail.member
    })
    this.showDress(event.detail.member);
    this.setData({
      aniPlay: true
    })
    this.showProps(event.detail.member);
  },

  handleLevelUp() {
    this.setData({
      ['mem.level']: this.data.mem.level + 1
    })
    this.showProps(this.data.mem);
    console.log(this.data.mem);
    setMyMem(this.data.mem);
  },

  // 显示拥有该卡片的所有皮肤
  showDress(mem) {
    let dress = new Array();
    let students = require('../../data/students.js').studentsJson;
    for(let stu of students) {
      if(mem.sid == stu.sid) {
        for(let mydid of mem.did) {
          for(let dre of stu.dress) {
            if(mydid == dre.did) {
              dress.push(dre);
            }
          }
        }
      }
    }
    this.setData({
      dress
    })
  },

  showProps(mem) {
    this.setData({
      expandMem: expandMember(mem)
    })    
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取storage里面的货币数量
    this.setData({
      coin: wx.getStorageSync('coin') || 0,
      diamond: wx.getStorageSync('diamond') || 0,
      members: wx.getStorageSync('myMembers'),
      mem: wx.getStorageSync('myMembers')[0],
    })
    this.showDress(this.data.mem);
    this.showProps(this.data.mem);
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})