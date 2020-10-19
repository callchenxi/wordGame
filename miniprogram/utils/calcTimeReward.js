import getRandomInt from './getRandomInt.js';

export default function calcTimeReward(now) {
  const C_REWARD = 2;
  const D_REWARD = 1;

  let last = wx.getStorageSync('hangDate');
  if(!last) {
    // 没有时间戳(说明刚开始玩), 则记录时间戳, 返回false
    wx.setStorageSync('hangDate', now); 
    return {
      flag: false,
    };
  } else {
    // 计算经历了几分钟
    let duration = Math.round((now - last) / 1000 / 60);
    console.log(duration);
    if(duration < 1) {
      // 间隔不足1分钟, 则返回false
      return {
        flag: false,
      }
    } else {
      // 间隔超过1分钟, 则计算奖励
      let coinReward = C_REWARD * duration;
      let diamondReward = getRandomInt(0, D_REWARD * duration)
      // 重新保存时间戳
      wx.setStorageSync('hangDate', now); 
      // 返回true及奖励值
      return {
        flag: true,
        coinReward,
        diamondReward,
      };
    }    
  }  
}