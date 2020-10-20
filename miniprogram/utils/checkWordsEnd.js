export default function checkWordsEnd(wid) {
  let words = require('../data/words.js').wordsJson;
  if (wid > words.length - 1) {
    wx.showToast({
      title: '已全部背完',
      duration: 1000,
      mask: true,
    });
    setTimeout(() => {
      wx.redirectTo({      
        url: '../index/index',
      })
    }, 1100)
  } else {
    wx.redirectTo({      
      url: '../study/study?wid=' + wid,
    })
  }    
}