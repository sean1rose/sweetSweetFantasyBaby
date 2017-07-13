import wr1 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk1_stats.json';
import wr2 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk2_stats.json';
import wr3 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk3_stats.json';
import wr4 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk4_stats.json';
import wr5 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk5_stats.json';
import wr6 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk6_stats.json';
import wr7 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk7_stats.json';
import wr8 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk8_stats.json';
import wr9 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk9_stats.json';
import wr10 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk10_stats.json';
import wr11 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk11_stats.json';
import wr12 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk12_stats.json';
import wr13 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk13_stats.json';
import wr14 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk14_stats.json';
import wr15 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk15_stats.json';
import wr16 from '../../ffdata/2016_wr_stats/weekly/2016_widereceiver_wk16_stats.json';
import widereceivers from '../../ffdata/2016_wr_stats/2016_widereceiver_stats.json';

var widereceiverObj = {
  wr1, wr2, wr3, wr4, wr5, wr6, wr7, wr8, wr9, wr10, wr11, wr12, wr13, wr14, wr15, wr16
}

import Fuse from 'fuse.js';
// http://fusejs.io/

const wrWeeklyTargetUtil = {
  wideReceiverWeek: (weekNumber) => {
    // returns obj of all wrs for that week
    var wrString = `wr${weekNumber}`;
    var wrArray = widereceiverObj[wrString];
    var result = {};
    wrArray.map((wr, idx) => {
      // wr[`week_${weekNumber}_rank`] = idx + 1;
      wr.Rank = idx + 1;
      result[wr.Player_2] = wr;
    });
    return result;
    // return obj of wrs for that week
  },
  getWrFromWeek: (name, week) => {
    // need single wr-obj from a week
    var weekReceivers = wrWeeklyTargetUtil.wideReceiverWeek(week);
    return weekReceivers[name];
  },
  getWrRankFromWeek: (weekNumber, rank) => {
    // util to help calc the TOTAL NUMBER of WR1/2/3 finishes
    var wrString = `wr${weekNumber}`;
    var wrArray = widereceiverObj[wrString];
    var result = {
      Targets: 0,
      FantasyPts: 0,
      RzTargets: 0
    };
    var finalRank = rank === 1 ? 11 : rank === 2 ? 23 : 35;
    result.Targets = (wrArray[finalRank].Targets);
    result.FantasyPts = wrArray[finalRank].FantasyPts;
    result.RzTargets = wrArray[finalRank].Rec_Tar_Rz_In_20;
    return result;
  },
  calcWrRankFinishes: (name, rank) => {
    // used to calc the TOTAL NUMBER OF WR1/2/3 finishes
    var finalObj = {};
    var total = 0;
    var percent;
    for (var i = 1; i <= 16; i++){
      var wr = wrWeeklyTargetUtil.getWrRankFromWeek(i, rank);
      var current = wrWeeklyTargetUtil.getWrFromWeek(name, i);
      if (current && current.FantasyPts >= wr.FantasyPts){
        total += 1;
      }
    }
    percent = (total / 15);
    finalObj.total = total;
    finalObj.percent = percent;
    return finalObj;
  },
  getWrTwelveFromWeek: (weekNumber) => {
    // used to calc WR1.12 stats
    var wrString = `wr${weekNumber}`;
    var wrArray = widereceiverObj[wrString];
    var result = {};
    result.Targets = wrArray[11].Targets;
    result.FantasyPts = wrArray[11].FantasyPts;
    result.RzTargets = wrArray[11].Rec_Tar_Rz_In_20;
    return result;
  },
  calcWeeklyAvg: (stat, rank) => {
    // used to calc avg WR1/1.12/2/3 stats -> calls either [getWrTwelveFromWeek] or [getWrAvgRankFromWeek]
    var result = [];
    var total = 0;
    var avg;
    if (rank === 1.12){
      for (var i = 1; i <= 16; i++){
        result.push(wrWeeklyTargetUtil.getWrTwelveFromWeek(i)[stat])
        total += wrWeeklyTargetUtil.getWrTwelveFromWeek(i)[stat];
      }
      avg = (total / 16);
      result.push(wrWeeklyTargetUtil.round(avg, 1));
      console.log('----> RESULT - ', result);
      return result;
    }
    for (var i = 1; i <= 16; i++){
      var obj = wrWeeklyTargetUtil.getWrAvgRankFromWeek(i, rank);
      var rounded = wrWeeklyTargetUtil.round(obj[stat], 1);
      // console.log(`week ${i}'s avg is - ${rounded}`);
      result.push(rounded);
      total += rounded;
    }
    console.log('----result - ', result);
    avg = (total / 16);
    result.push(wrWeeklyTargetUtil.round(avg, 1));
    return result;
  },
  getWrAvgRankFromWeek: (weekNumber, rank) => {
    // used to calc avg WR1/2/3 stats
    var wrString = `wr${weekNumber}`;
    var wrArray = widereceiverObj[wrString];
    var result = {
      targets: 0,
      fantasyPts: 0,
      rzTargets: 0
    };
    var counter1 = rank === 1 ? 0 : rank === 2 ? 12 : 24;
    var counter2 = rank === 1 ? 12 : rank === 2 ? 24 : 36;
    for (var i = counter1; i < counter2; i++){
      result.targets += wrArray[i].Targets;
      result.fantasyPts += wrArray[i].FantasyPts;
      result.rzTargets += wrArray[i].Rec_Tar_Rz_In_20;
    }
    var avg = {};
    avg.Targets = (result.targets / 12);
    avg.FantasyPts = (result.fantasyPts / 12);
    avg.RzTargets = (result.rzTargets / 12);
    // console.log('wrArray = ', avg);
    return avg;
  },
  calcWeeklyTotal: (player, stat) => {
    // used to calc selected player's weekly stats for ftpts, touches and rztouches for combo chart
    // manually calc TotalTd from (recTd + rushTd)
    var result = [];
    var total = 0;
    var counter = 0;
    var gamesPlayed = 16;
    var objLength = Object.keys(player).length;
    // console.log('obj length !!!! - ', objLength);
    for (var week in player){
      counter++;
      if (stat === "RzTargets"){
        if (player[week]){
          var twenty = player[week]["Rec_Tar_Rz_In_20"];
          total += player[week]["Rec_Tar_Rz_In_20"];
          if (counter === 16){
            var avg = (total / gamesPlayed);
            // console.log(`total is ${total} and avg is ${avg}`);
            result.push(twenty);
            result.push(wrWeeklyTargetUtil.round(avg, 1));
            // console.log('result after adding avg is - ', result);
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
          total += player[week][stat];
          if (counter === 16){
            var avg = (total / gamesPlayed);
            // console.log(`total is ${total} and avg is ${avg}`);
            result.push(player[week][stat]);
            result.push(wrWeeklyTargetUtil.round(avg, 1));
            // console.log('result after adding avg is - ', result);
          } else {
            result.push(player[week][stat]);
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
  getWrAllWeeks: (name) => {
    // returns obj w/ a player's weekly performance (each week is a property)
    var result = {};
    for (var i = 1; i <= 16; i++){
      result[i] = wrWeeklyTargetUtil.getWrFromWeek(name, i);
    }
    return result;
  },
  getAllWidereceivers: () => {
    // returns an array of all wrs
    return widereceivers;
  },
  get: (id) => {
    // used by search input
    var options = {keys: ['Player_2'], threshold: 0.3};
    var fuse = new Fuse(widereceiverObj, options);
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

export default wrWeeklyTargetUtil;