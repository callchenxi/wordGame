export default function expandMember(member) {
  // 将 对象引用 转化为 值引用
  let expandMember = Object.assign({}, member)
  let students = require('../data/students.js').studentsJson;
  let borders = require('../data/borders.js').bordersJson;
  expandMember.name = students[member.sid].name;
  expandMember.pic = students[member.sid].dress[member.didNow].pic;
  expandMember.picB = borders[member.bid].picB;
  expandMember.maxLv = borders[member.bid].maxLv;
  expandMember.needFrag = borders[member.bid].needFrag;
  expandMember.props = new Object()
  expandMember.props.hp = students[member.sid].props.hp + students[member.sid].props.hpRate * (member.level - 1); 
  expandMember.props.atk = students[member.sid].props.atk + students[member.sid].props.atkRate * (member.level - 1); 
  expandMember.props.def = students[member.sid].props.def + students[member.sid].props.defRate * (member.level - 1);
  return expandMember;
}