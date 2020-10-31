// components/w-awake-animation/w-awake-aniamtion.js
import expandMember from '../../utils/expandMember';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    oldCard: {
      type: Object,
      value: {
        sid: 2,
        level: 20,
        bid: 0,
        didNow: 0,
        did: [0, 1, 2, 3],
        num: 2,
        inTeam: true
      }
    },
    newCard: {
      type: Object,
      value: {
        sid: 2,
        level: 21,
        bid: 1,
        didNow: 0,
        did: [0, 1, 2, 3],
        num: 2,
        inTeam: true
      }
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
      this.setData({
        old: expandMember(this.properties.oldCard),
        new: expandMember(this.properties.newCard),
      })
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
    attached() {
      
    }
  }
})
