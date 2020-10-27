// 获得新卡时, 进行新卡初始化
export default function createNewMem(sid) {
  // 注意对象引用 和 值引用
  let obj = require('../moulds/m-myMember.js').newMemberObj;
  // 将 对象引用 转化为 值引用
  let newMember = Object.assign({}, obj);
  newMember.sid = sid;
  return newMember
}