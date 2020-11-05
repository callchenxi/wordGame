// skid 要和 index 保持一致
// rid 为 race id
var json = [
  {
    skid: 0,
    txt: '与懒惰系敌人战斗时, 全队增伤5%',
    increase: {
      rid: [0],
      num: 15,
    },
    decrease: {}
  },{
    skid: 1,
    txt: '与懒惰系敌人战斗时, 全队免伤5%',
    increase: {},
    decrease: {
      rid: [0],
      num: 15,
    }
  },{
    skid: 2,
    txt: '与懒惰系敌人战斗时, 全队增伤7%, 免伤7%',
    increase: {
      rid: [0],
      num: 7,
    },
    decrease: {
      rid: [0],
      num: 7,
    }
  },{
    skid: 3,
    txt: '与拖延系敌人战斗时, 全队增伤15%',
    increase: {
      rid: [1],
      num: 15,
    },
    decrease: {}
  },{
    skid: 4,
    txt: '与拖延系敌人战斗时, 全队免伤15%',
    increase: {},
    decrease: {
      rid: [1],
      num: 15,
    }
  },{
    skid: 5,
    txt: '与拖延系敌人战斗时, 全队增伤7%, 免伤7%',
    increase: {
      rid: [1],
      num: 7,
    },
    decrease: {
      rid: [1],
      num: 7,
    }
  },{
    skid: 6,
    txt: '与放弃系敌人战斗时, 全队增伤15%',
    increase: {
      rid: [2],
      num: 15,
    },
    decrease: {}
  },{
    skid: 7,
    txt: '与放弃系敌人战斗时, 全队免伤15%',
    increase: {},
    decrease: {
      rid: [2],
      num: 15,
    }
  },{
    skid: 8,
    txt: '与放弃系敌人战斗时, 全队增伤7%, 免伤7%',
    increase: {
      rid: [2],
      num: 7,
    },
    decrease: {
      rid: [2],
      num: 7,
    }
  },{
    skid: 9,
    txt: '与马虎系敌人战斗时, 全队增伤15%',
    increase: {
      rid: [3],
      num: 15,
    },
    decrease: {}
  },{
    skid: 10,
    txt: '与马虎系敌人战斗时, 全队免伤15%',
    increase: {},
    decrease: {
      rid: [3],
      num: 15,
    }
  },{
    skid: 11,
    txt: '与马虎系敌人战斗时, 全队增伤7%, 免伤%',
    increase: {
      rid: [3],
      num: 7,
    },
    decrease: {
      rid: [3],
      num: 7,
    }
  },{
    skid: 12,
    txt: '与全系敌人战斗时, 全队增伤5%',
    increase: {
      rid: [0, 1, 2, 3],
      num: 5,
    },
    decrease: {}
  },{
    skid: 13,
    txt: '与全系敌人战斗时, 全队免伤5%',
    increase: {},
    decrease: {
      rid: [0, 1, 2, 3],
      num: 5,
    }
  },
]

module.exports = {
  skillsJson: json
}