export default function setMyMem(member) {
  let members = wx.getStorageSync('myMembers');
  for(let i in members) {
    if(members[i].sid == member.sid) {
      members[i] = member;
      console.log('=');
      
    }
  }
  wx.setStorageSync('myMembers', members);
}