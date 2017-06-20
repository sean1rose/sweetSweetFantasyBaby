import runningbacks from '../../ffdata/2016_individual_season_totals/huddle2016rb(non-keyed).json';
import Fuse from 'fuse.js';
// http://fusejs.io/

const getRb2016 = {
  all: () => { 
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
    player.TDPERTOUCH = getRb2016.convertToPercent(player.TOTALTD / player.TOUCHES);
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
  calcAvg: (listOfRb, number) => {
    var rbAvg = getRb2016.blankslate();    
    // loop thru each rb
    var start = 1;
    var iteratorLength = 12;
    switch(number){
      case 2:
        start += 12;
        iteratorLength += 12;
        // ^ starts @ 12
        break;
      case 3:
        start += 24;
        iteratorLength += 24;
        break;
      case 4:
        start += 36;
        iteratorLength += 36;
        break;
      case 5:
        start += 48;
        iteratorLength += 48;
        break;
      case 1:
        break;
    }
    // 1s -> for (var i = listOfRb.length - 1; i >= listOfRb.length - 12; i--){
    // 2s -> for (var i = runningbacks.length - 13; i >= runningbacks.length - 24; i--){
    // 3s -> for (var i = runningbacks.length - 25; i >= runningbacks.length - 36; i--){
    for (var i = listOfRb.length - start; i >= listOfRb.length - iteratorLength; i--){
      var current = getRb2016.calcAdditionalStats(listOfRb[i]);
        // loop thru each of current's stat categories
      for (var key in current){
        // w/ each category -> add each category to rbOneAb stat total
        rbAvg[key] += current[key];
      }
    }
    // after looping thru all 12 rb1s -> divide each category by 12
    for (var key in rbAvg){
      var currentCategory = rbAvg[key];
      rbAvg[key] = (rbAvg[key] / 12);
    }
    rbAvg.PLAYER = 'RB' + number + ' Average';;
    rbAvg.TEAM = "";
    rbAvg.TDPERTOUCH = getRb2016.convertToPercent(rbAvg.TOTALTD / rbAvg.TOUCHES);
    // console.log('avg - ', rbAvg);
    return rbAvg;
    
  },
  getRbOneAvg: () => {
    return getRb2016.calcAvg(runningbacks, 1);
  },
  getRbTwoAvg: () => {
    return getRb2016.calcAvg(runningbacks, 2);
  },
  getRbThreeAvg: () => {
    return getRb2016.calcAvg(runningbacks, 3);
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
  },
  convertToPercent: (fraction) => {
    return Math.round(fraction * 10000) / 100;
  }
};

export default getRb2016;