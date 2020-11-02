export default class Member {
  // 构造函数
  constructor(mem) {
    if(mem) {
      this.sid = mem.sid;  //  卡片对应的student id
      this.level = mem.level;  //  卡片等级
      this.bid = mem.bid;   //  卡片对应的border id
      this.didNow = mem.didNow;   //  卡片目前对应的dress id
      this.did = mem.did;  //  卡片目前拥有的dress id
      this.num = mem.num;   // 拥有同名卡片的数量    
      this.inTeam = mem.inTeam;   // 卡片是否在编队中
    }
  }
  // 创建新member
  createNewMem(sid) {
    this.sid = sid;  //  卡片对应的student id
    this.level = 1;  //  卡片等级
    this.bid = 0;   //  卡片对应的border id
    this.didNow = 0;   //  卡片目前对应的dress id
    this.did = [0];  //  卡片目前拥有的dress id
    this.num = 0;   // 拥有同名卡片的数量    
    this.inTeam = false;   // 卡片是否在编队中
  }
  // 展开显示Member
  expandMember() {
    let students = require('../data/students.js').studentsJson;
    let borders = require('../data/borders.js').bordersJson;
    this.name = students[this.sid].name;
    this.pic = students[this.sid].dress[this.didNow].pic;
    this.picB = borders[this.bid].picB;
    this.maxLv = borders[this.bid].maxLv;
    this.needFrag = borders[this.bid].needFrag;
    this.props = new Object()
    this.props.hp = students[this.sid].props.hp + students[this.sid].props.hpRate * (this.level - 1); 
    this.props.atk = students[this.sid].props.atk + students[this.sid].props.atkRate * (this.level - 1); 
    this.props.def = students[this.sid].props.def + students[this.sid].props.defRate * (this.level - 1);
  }
}