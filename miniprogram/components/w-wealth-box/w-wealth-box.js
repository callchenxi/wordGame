// components/w-wealth-box/w-wealth-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coin: {
      type: Number,
      // 自动监听,写入更新数据
      observer: function(newVal) {
        wx.setStorageSync('coin', newVal);
      }
    },
    diamond: {
      type: Number,
      // 自动监听,写入更新数据
      observer: function(newVal) {
        wx.setStorageSync('diamond', newVal);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
