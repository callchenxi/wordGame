var obj = {
  sid: 0,   //  卡片对应的student id
  level: 1,   //  卡片等级
  bid: 0,   //  卡片对应的border id
  didNow: 0,   //  卡片目前对应的dress id
  did: [0],   //  卡片目前拥有的dress id
  num: 0,   // 拥有同名卡片的数量    
  inTeam: false,    // 卡片是否在编队中
}

module.exports = {
  newMemberObj: obj
}

