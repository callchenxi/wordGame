import Member from '../class/Member.js'
export default function expandTeam() {
  let expandTeam = new Array();
  let team = wx.getStorageSync('team');
  let myMembers = wx.getStorageSync('myMembers');
  for(let teamMem of team) {
    for(let mem of myMembers) {
      if(teamMem.sid == mem.sid) {
        let newMem = new Member(mem);
        newMem.expandMember();
        expandTeam.push(newMem)
      }
    }
  }
  return expandTeam;
}