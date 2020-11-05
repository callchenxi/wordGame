export default function calcBuff(expandTeam) {
  let buff = new Array(4);
  let race = require('../data/race.js').raceJson;

  for(let i = 0; i < 4; i++) {
    buff[i] = Object.assign({}, race[i])
    buff[i].increase = 0;
    buff[i].decrease = 0;
  }
  
  for(let mem of expandTeam) {
    if(Object.keys(mem.skill.increase).length > 0) {
      for(let id of mem.skill.increase.rid) {
        buff[id].increase += mem.skill.increase.num;
      }
    }
    if(Object.keys(mem.skill.decrease).length > 0) {
      for(let id of mem.skill.decrease.rid) {
        buff[id].decrease += mem.skill.decrease.num;
      }
    }
  }
  return buff
}