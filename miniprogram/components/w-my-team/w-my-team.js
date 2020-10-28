// components/w-my-team/w-my-team.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    team: Array()
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached() {
       this.setData({
         team: wx.getStorageSync('team')
       })
       console.log(this.data.team);   
    }
  }
})
