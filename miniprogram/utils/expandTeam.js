export default function expandTeam() {
  let expandTeam = new Array();
  let team = wx.getStorageSync('team');
  let myMembers = wx.getStorageSync('myMembers');
  let students = require('../data/students.js').studentsJson;
  let borders = require('../data/borders.js').bordersJson;
  for(let teamMem of team) {
    for(let myMem of myMembers) {
      // 将队伍中的sid 和 所有myMembers 查找对应起来
      if(teamMem.sid == myMem.sid) {
        let obj = require('../moulds/m-teamMember.js').teamMemberObj;
        // 将 对象引用 转化为 值引用
        let member = Object.assign({}, obj);
        member.sid = teamMem.sid;
        member.level = myMem.level;
        member.name = students[myMem.sid].name;
        member.pic = students[myMem.sid].dress[myMem.didNow].pic;
        member.picB = borders[myMem.bid].picB;
        member.props = new Object()
        member.props.hp = students[myMem.sid].props.hp + students[myMem.sid].props.hpRate * (myMem.level - 1); 
        member.props.atk = students[myMem.sid].props.atk + students[myMem.sid].props.atkRate * (myMem.level - 1); 
        member.props.def = students[myMem.sid].props.def + students[myMem.sid].props.defRate * (myMem.level - 1); 
        expandTeam.push(member);
      }  
    }
  }
  return expandTeam;
}