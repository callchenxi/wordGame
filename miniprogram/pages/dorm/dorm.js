// pages/dorm/dorm.js
import setMyMem from '../../utils/setMyMem.js';
import calcNeedCoin from '../../utils/calcNeedCoin.js';
import Member from '../../class/Member.js';
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
    needCoin: 0,
    isShow: false,
    oldCard: Object(),
    mewCard: Object(),
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
    if(this.data.coin < this.data.needCoin) {
      wx.showToast({
        title: '金币不足',
        duration: 700,
        icon: 'none',
        mask: true
      })
      return;
    }
    this.setData({
      ['mem.level']: this.data.mem.level + 1,
      coin: this.data.coin - this.data.needCoin
    })
    this.showProps(this.data.mem);
    setMyMem(this.data.mem);
  },

  handleAwake() {
    // 判断金币及同名卡是否足够
    if(this.data.coin < this.data.needCoin) {
      wx.showToast({
        title: '金币不足',
        duration: 700,
        icon: 'none',
        mask: true
      })
      return;
    } else if (this.data.expandMem.num < this.data.expandMem.needFrag) {
      wx.showToast({
        title: '同名卡不足',
        duration: 700,
        icon: 'none',
        mask: true
      })
      return;
    }
    // 保存就卡数据
    let oldCard = new Member(this.data.mem);
    oldCard.expandMember()

    this.setData({
      ['mem.level']: this.data.mem.level + 1,
      ['mem.bid']: this.data.mem.bid + 1,
      ['mem.num']: this.data.mem.num - this.data.expandMem.needFrag,
      coin: this.data.coin - this.data.needCoin
    })

    this.data.mem = this.getNewDress(this.data.mem)
    this.showProps(this.data.mem);
    this.showDress(this.data.mem);
    
    // 保存新卡数据
    let newCard = new Member(this.data.mem);
    newCard.expandMember()
    this.setData({
      oldCard,
      newCard, 
      isShow: true,
    })
    this.selectComponent('.awake-ani').show()
    
    setMyMem(this.data.mem);
    // 更新组件数据(因为觉醒后边框及默认皮肤发生变化)
    this.selectComponent('.cpn-members').displayMyMems();
    this.setData({
      mem: this.data.mem,     
    })
  },

  handleDressup() {
    this.setData({
      isShow: true,
    })
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

  //  显示该卡片的相关属性
  showProps(mem) {
    this.data.expandMem = new Member(mem);
    this.data.expandMem.expandMember();
    this.setData({
      expandMem: this.data.expandMem,
      needCoin: calcNeedCoin(mem.level)
    })
  },

  //  判断觉醒后是否获得新皮肤
  getNewDress(mem) {
    let borders = require('../../data/borders.js').bordersJson;
    if(borders[mem.bid].newDid != -1) {
      for(let id of mem.did) {
        if(id == borders[mem.bid].newDid) {
          return mem;
        }
      }
      // 觉醒成功,获得新皮肤
      mem.did.push(borders[mem.bid].newDid);
      mem.didNow = borders[mem.bid].newDid;
    } else {
      // 觉醒成功, 没有新皮肤
    }
    return mem;
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