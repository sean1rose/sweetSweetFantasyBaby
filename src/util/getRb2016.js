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
    if (player.FPTS)
      player.FPTSPERGAME = player.FPTS.G;
    player.TOUCHES = player.CMP + player.CARRIES;
    player.TOUCHESPERGAME = player.TOUCHES / player.GP;
    var convertToPercent = (fraction) => {
      return Math.round(fraction * 100 * 100) / 100;
    };
    player.TDPERTOUCH = convertToPercent(player.TOTALTD / player.TOUCHES);
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
  },
  getRbOneAvg: () => {
    var rbOneAvg = getRb2016.blankslate();    
    // loop thru each rb
    for (var i = runningbacks.length - 1; i >= runningbacks.length - 12; i--){
      var current = getRb2016.calcAdditionalStats(runningbacks[i]);
        // loop thru each of current's stat categories
      for (var key in current){
        // w/ each category -> add each category to rbOneAb stat total
        rbOneAvg[key] += current[key];
      }
    }
    // after looping thru all 12 rb1s -> divide each category by 12
    for (var key in rbOneAvg){
      var currentCategory = rbOneAvg[key];
      rbOneAvg[key] = (rbOneAvg[key] / 12);
    }
    rbOneAvg.PLAYER = "RB1 Average";
    rbOneAvg.TEAM = "";
    return rbOneAvg;
  },
  blankslate: () => {
    // used to calculate avgs
    return {
      "PLAYER": "RB1 AVERAGE",
      "PLAYS": 0,
      "FANTASYPTS": 0,
      "GP": 0,
      "FPTSPERGAME": 0,
      "CARRIES": 0,
      "RYD": 0,
      "RTD": 0,
      "PASS": 0,
      "CMP": 0,
      "PYDS": 0,
      "PTD": 0,
      "FUM": 0,
      "INT": 0,
      "FANTASYPTSPERTOUCH": 0,
      "TOTALTD": 0,
      "TOTALYD": 0,
      "FPTSPERGAME": 0,
      "TOUCHES": 0,
      "TOUCHESPERGAME": 0,
      "TDPERTOUCH": 0
    }
  }
};

export default getRb2016;