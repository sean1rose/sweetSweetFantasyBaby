import runningbacks from '../../ffdata/huddle2016rb(non-keyed).json';
import Fuse from 'fuse.js';
// http://fusejs.io/

const getRb2016 = {
  all: () => { 
    console.log('get all in util - ', runningbacks);
    return runningbacks
  },
  get: (id) => {
    var options = {keys: ['PLAYER'], threshold: 0.3};
    var fuse = new Fuse(runningbacks, options);
    // returns an array w/ results (hopefully only 1 result)
    return fuse.search(id);
  },
  calcAdditionalStats: (player) => {
    // before pushing, attach a few extra stats:
      // ftpts/touch, total tds, total yds
    player.FANTASYPTSPERTOUCH = player.FANTASYPTS / (player.CMP + player.CARRIES);
    player.TOTALTD = player.PTD + player.RTD;
    player.TOTALYD = player.PYDS + player.RYD;
    player.FPTSPERGAME = player.FPTS.G;
    player.TOUCHES = player.CMP + player.CARRIES;
    player.TOUCHESPERGAME = player.TOUCHES / player.GP;
    delete player.FPTS;
    return player;
  },
  getRbOnes: () => {
    // return RB1 avgs (1-12)
    var result = [];
    for (var i = runningbacks.length - 1; i >= runningbacks.length - 12; i--){
      var current = getRb2016.calcAdditionalStats(runningbacks[i]);
      result.push(current);
    }
    return result;
    // return list;
  },
  getRbTwos: () => {
    // return RB2 avgs (13-24)
    var result = [];
    for (var i = runningbacks.length - 13; i >= runningbacks.length - 24; i--){
      var current = getRb2016.calcAdditionalStats(runningbacks[i]);
      result.push(current);
    }
    return result;
  },
  getRbThrees: () => {
    // return RB3 avgs (25 - 36)
    var result = [];
    for (var i = runningbacks.length - 25; i >= runningbacks.length - 36; i--){
      var current = getRb2016.calcAdditionalStats(runningbacks[i]);
      result.push(current);
    }
    return result;
  }
};

export default getRb2016;