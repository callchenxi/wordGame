export default function showMyMems() {
  let showMembers = new Array();
  let myMembers = wx.getStorageSync('myMembers');
  let students = require('../data/students.js').studentsJson;
  let borders = require('../data/borders.js').bordersJson;
  for(let myMem of myMembers) {
    let obj = require('../moulds/m-myMember.js').newMemberObj;
    // 将 对象引用 转化为 值引用
    let member = Object.assign({}, obj);
    member.sid = myMem.sid;
    member.level = myMem.level;
    member.name = students[myMem.sid].name;
    member.pic = students[myMem.sid].dress[myMem.didNow].pic;
    member.picB = borders[myMem.bid].picB;
    showMembers.push(member);
  }
  return showMembers;
}