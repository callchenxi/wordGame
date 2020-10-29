// components/w-show-my-members/w-show-my-members.js
import showMyMems from '../../utils/showMyMems.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // type有'team'和'grow'两个字段可选
    type: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    _myMembers: Array(),
    _team: Array(),
    showMyMembers: Array(),  
    currentIndex: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCheck(e) {
      // currentIndex用于触发动画class
      this.setData({
        currentIndex: -1
      })
      let index = e.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      })

      if(this.properties.type == 'team') {
        this.showInTeam(e);        
        this.triggerEvent('reflash', {}, {});
      } else if(this.properties.type == 'grow') {
        let member = this.showInGrow(e);
        this.triggerEvent('reflash', {member}, {});
      }
    },

    // 在编组界面中显示现有成员
    showInTeam(e) {
      let index = e.currentTarget.dataset.index;
      // 判断该成员是否在队伍中
      if(!this.data.showMyMembers[index].inTeam) {
         // 判断队伍是否已满
         if(this.data._team.length < 5) {
          this.setData({
            ['showMyMembers[' + index + '].inTeam']: true
          })
          this.data._myMembers[index].inTeam = true;
          // 给队伍增加该成员
          this.data._team.push({sid: this.data.showMyMembers[index].sid});
        } else {
          wx.showToast({
            title: '队伍已满',
            duration: 800,
            icon: 'none'
          })
          return;
        }
      } else {
        this.setData({
          ['showMyMembers[' + index + '].inTeam']: false
        })
        this.data._myMembers[index].inTeam = false;
        for(let i in this.data._team) {
          // 给队伍移除该成员
          if(this.data._team[i].sid == this.data.showMyMembers[index].sid) {
            this.data._team.splice(i, 1);
          }
        }       
      }
      // 更新storage数据 myMembers      
      wx.setStorageSync('myMembers', this.data._myMembers)
      wx.setStorageSync('team', this.data._team)
    },

    // 在成长界面中显示现有成员
    showInGrow(e) {
      let i = e.currentTarget.dataset.index;
      return this.data._myMembers[i];
    }
  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached() {
      let showMyMembers = showMyMems();
      this.data._myMembers = wx.getStorageSync('myMembers') || new Array();
      this.data._team = wx.getStorageSync('team') || new Array();
      this.setData({
        showMyMembers,
      })  
    }
  }
})
