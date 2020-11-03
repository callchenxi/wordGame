import words from '../data/words.js';
import getRandomInt from './getRandomInt.js'
export default function getExamWid() {
  let learned = wx.getStorageSync('learned') || null;
  if(learned == null) {
    wx.showToast({
      title: '目前无可复习的单词',
      duration: 700,
      icon: 'none',
      mask: true
    })
    return;
  }
  let raid = getRandomInt(0, 9);
  let words = new Array()
  // 循环直到words数组里有值
  do {
    console.log(raid);
    words = learned.filter(item => {
      if(item.raid >= raid) {
        return item
      }
    })
    raid --;
  } while (words.length == 0)
  console.log(words);
  
  let index = getRandomInt(0, words.length - 1);  
  return words[index].wid
}