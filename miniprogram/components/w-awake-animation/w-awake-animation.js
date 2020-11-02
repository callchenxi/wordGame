// components/w-awake-animation/w-awake-aniamtion.js
import Member from '../../class/Member.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    oldCard: {
      type: Object,
    },
    newCard: {
      type: Object,
    },
    isAni: Boolean,
    isShow: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    old: Object(),
    new: Object(),
    isEnd: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleHide() {
      this.setData({
        isShow: false,
        isAni: false,
        isEnd: false,
      })
    },

    show() {
      setTimeout(() => {
        this.setData({
          isAni: true,
        })
      }, 800)
      setTimeout(() => {
        this.setData({
          isEnd: true,
        })
      }, 3000)
    }
  },

  lifetimes: {
  }
})
