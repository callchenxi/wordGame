// components/w-stage-list/w-stage-list.js
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
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleShowDisc(e) {
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
    },
    handleToBattle() {
      wx.redirectTo({
        url: '../../pages/battle/battle',
      })
    }
  }
})
