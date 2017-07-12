import rb1 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk1_stats.json';
import rb2 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk2_stats.json';
import rb3 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk3_stats.json';
import rb4 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk4_stats.json';
import rb5 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk5_stats.json';
import rb6 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk6_stats.json';
import rb7 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk7_stats.json';
import rb8 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk8_stats.json';
import rb9 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk9_stats.json';
import rb10 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk10_stats.json';
import rb11 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk11_stats.json';
import rb12 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk12_stats.json';
import rb13 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk13_stats.json';
import rb14 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk14_stats.json';
import rb15 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk15_stats.json';
import rb16 from '../../ffdata/2016_rb_stats/weekly/2016_runningback_wk16_stats.json';
import runningbacks from '../../ffdata/2016_rb_stats/2016_runningback_stats.json';

var runningbackObj = {
  rb1, rb2, rb3, rb4, rb5, rb6, rb7, rb8, rb9, rb10, rb11, rb12, rb13, rb14, rb15, rb16
}

import Fuse from 'fuse.js';
// http://fusejs.io/

const rbWeeklyTouchesUtil = {
  runningbackWeek: (weekNumber) => {
    var rbString = `rb${weekNumber}`;
    var rbArray = runningbackObj[rbString];
    var result = {};
    rbArray.map((rb, idx) => {
      // rb[`week_${weekNumber}_rank`] = idx + 1;
      rb.Rank = idx + 1;
      result[rb.Player_2] = rb;
    });
    // console.log('rb week - ', result);
    return result;
    // return obj of rbs for that week
  },
  getRbFromWeek: (name, week) => {
    // need single rb-obj from a week
    var weekRunningbacks = rbWeeklyTouchesUtil.runningbackWeek(week);
    // console.log('>>> ',  name, weekRunningbacks[name], weekRunningbacks);
    return weekRunningbacks[name];
  },
  getRbRankFromWeek: (weekNumber, rank) => {
    var rbString = `rb${weekNumber}`;
    var rbArray = runningbackObj[rbString];
    var result = {
      touches: 0,
      fantasyPts: 0,
      rzTouches: 0
    };
    var counter1 = rank === 1 ? 0 : rank === 2 ? 12 : 24;
    var counter2 = rank === 1 ? 12 : rank === 2 ? 24 : 36;
    for (var i = counter1; i < counter2; i++){
      result.touches += rbArray[i].Rush_Att;
      result.touches += rbArray[i].Rec;
      result.fantasyPts += rbArray[i].FantasyPts;
      result.rzTouches += !rbArray[i].Rec_Tar_Rz_In_20 ? rbArray[i].Rush_Rz_In_20 : (rbArray[i].Rush_Rz_In_20 + rbArray[i].Rec_Tar_Rz_In_20);
    }
    var avg = {};
    avg.Touches = (result.touches / 12);
    avg.FantasyPts = (result.fantasyPts / 12);
    avg.RzTouches = (result.rzTouches / 12);
    // console.log('>>>>>avg = ', avg);
    return avg;
  },
  getRbTwelveFromWeek: (weekNumber) => {
    var rbString = `rb${weekNumber}`;
    var rbArray = runningbackObj[rbString];
    var result = {};
    result.Touches = (rbArray[11].Rush_Att + rbArray[11].Rec);
    result.FantasyPts = rbArray[11].FantasyPts;
    result.RzTouches = !rbArray[11].Rec_Tar_Rz_In_20 ? rbArray[11].Rush_Rz_In_20 : (rbArray[11].Rush_Rz_In_20 + rbArray[11].Rec_Tar_Rz_In_20);
    return result;
  },
  calcRbrOneFinishes: (name) => {
    var finalObj = {};
    var total = 0;
    var percent;
    for (var i = 1; i <= 16; i++){
      var rbOne = rbWeeklyTouchesUtil.getRbTwelveFromWeek(i);
      var current = rbWeeklyTouchesUtil.getRbFromWeek(name, i);
      if (current && current.FantasyPts >= rbOne.FantasyPts){
        total += 1;
      }
    }
    percent = (total / 15);
    finalObj.total = total;
    finalObj.percent = percent;
    // return total;
    // console.log('finalobj.total - ', finalObj.total);
    return finalObj;
  },
  calcWeeklyAvg: (stat, rank) => {
    var result = [];
    var total = 0;
    var avg;
    if (rank === 1.12){
      for (var i = 1; i <= 16; i++){
        result.push(rbWeeklyTouchesUtil.getRbTwelveFromWeek(i)[stat]);
        total += rbWeeklyTouchesUtil.getRbTwelveFromWeek(i)[stat];
      }
      avg = (total / 16);
      result.push(rbWeeklyTouchesUtil.round(avg, 1));
      // console.log('----> RESULT - ', result);
      return result;
    }
    for (var i = 1; i <= 16; i++){
      var obj = rbWeeklyTouchesUtil.getRbRankFromWeek(i, rank);
      var rounded =rbWeeklyTouchesUtil.round(obj[stat], 1);
      // console.log(`week ${i}'s avg ${stat} is - ${rounded}`);
      result.push(rounded);
      total += rounded;
    }
    avg = (total / 16);
    result.push(rbWeeklyTouchesUtil.round(avg, 1));
    return result;
  },
  getRbAllWeeks: (name) => {
    var result = {};
    for (var i = 1; i <= 16; i++){
      result[i] = rbWeeklyTouchesUtil.getRbFromWeek(name, i);
    }
    return result;
  },
  getAllRunningbacks: () => {
    return runningbacks;
    // returns an array of all wrs
  },
  calcWeeklyTotal: (player, stat) => {
    // used to calc weekly target/ftpts/td for combo chart
    // manually calc TotalTd from (recTd + rushTd)
    var result = [];
    var total = 0;
    var counter = 0;
    var gamesPlayed = 16;
    var objLength = Object.keys(player).length;
    for (var week in player){
      counter++;
      if (stat === "RzTouches"){
        if (player[week]){
          var twenty = !player[week]["Rush_Rz_In_20"] ? player[week]["Rec_Tar_Rz_In_20"] : (player[week]["Rec_Tar_Rz_In_20"] + player[week]["Rush_Rz_In_20"]);
          total += twenty;
          if (counter === 16){
            var avg = (total / gamesPlayed);
            result.push(twenty);
            result.push(rbWeeklyTouchesUtil.round(avg, 1));
          } else {
            result.push(twenty);
          }
        }
        else{
          gamesPlayed -= 1;
          result.push(null);
        }
      } else {
        if (player[week]){
          if (stat === "Touches"){
            total += (player[week]["Rush_Att"] + player[week]["Rec"]);
            if (counter === 16){
              var avg = (total / gamesPlayed);
              result.push(player[week]["Rush_Att"] + player[week]["Rec"]);
              result.push(rbWeeklyTouchesUtil.round(avg, 1));
            } else {
              result.push(player[week]["Rush_Att"] + player[week]["Rec"]);
            }
          } else {
            total += player[week][stat];
            if (counter === 16){
              var avg = (total / gamesPlayed);
              result.push(player[week][stat]);
              result.push(rbWeeklyTouchesUtil.round(avg, 1));
            } else {
              result.push(player[week][stat]);
            }
          }
        }
        else{
          gamesPlayed -= 1;
          result.push(null);
        }
      }
    }
    // console.log(`result for ${stat} - ', result`, result);
    return result;
  },
  get: (id) => {
    var options = {keys: ['Player_2'], threshold: 0.3};
    var fuse = new Fuse(runningbackObj, options);
    // returns an array w/ results (hopefully only 1 result)
    return fuse.search(id);
  },
  convertToPercent: (fraction) => {
    return Math.round(fraction * 10000) / 100;
  },
  round: (num, places) => {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
  }
};

export default rbWeeklyTouchesUtil;