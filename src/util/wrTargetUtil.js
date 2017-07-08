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

var wideReceiverObj = {
  wr1, wr2, wr3, wr4, wr5, wr6, wr7, wr8, wr9, wr10, wr11, wr12, wr13, wr14, wr15, wr16
}

import Fuse from 'fuse.js';
// http://fusejs.io/

const wrTargetUtil = {
  wideReceiverWeek: (weekNumber) => {
    var wrString = `wr${weekNumber}`;
    var wrArray = wideReceiverObj[wrString];
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
    var weekReceivers = wrTargetUtil.wideReceiverWeek(week);
    return weekReceivers[name];
  },
  getWrRankFromWeek: (weekNumber, rank) => {
    var wrString = `wr${weekNumber}`;
    var wrArray = wideReceiverObj[wrString];
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
      result.rzTargets += wrArray[i].Rec_Tar_Rz_In_5;
      result.rzTargets += wrArray[i].Rec_Tar_Rz_In_10;
      result.rzTargets += wrArray[i].Rec_Tar_Rz_In_20;
    }
    var avg = {};
    avg.Targets = (result.targets / 12);
    avg.FantasyPts = (result.fantasyPts / 12);
    avg.RzTargets = (result.rzTargets / 12);
    // console.log('wrArray = ', avg);
    return avg;
  },
  // getWrOneFromWeek: (weekNumber) => {
  //   var wrString = `wr${weekNumber}`;
  //   var wrArray = wideReceiverObj[wrString];
  //   var result = {
  //     targets: 0,
  //     fantasyPts: 0,
  //     rzTargets: 0
  //   };
  //   for (var i = 0; i < 12; i++){
  //     result.targets += wrArray[i].Targets;
  //     result.fantasyPts += wrArray[i].FantasyPts;
  //     result.rzTargets += wrArray[i].Rec_Tar_Rz_In_5;
  //     result.rzTargets += wrArray[i].Rec_Tar_Rz_In_10;
  //     result.rzTargets += wrArray[i].Rec_Tar_Rz_In_20;
  //   }
  //   var avg = {};
  //   avg.Targets = (result.targets / 12);
  //   avg.FantasyPts = (result.fantasyPts / 12);
  //   avg.RzTargets = (result.rzTargets / 12);
  //   // console.log('wrArray = ', avg);
  //   return avg;
  // },
  getWrTwelveFromWeek: (weekNumber) => {
    var wrString = `wr${weekNumber}`;
    var wrArray = wideReceiverObj[wrString];
    var result = {};
    result.Targets = wrArray[11].Targets;
    result.FantasyPts = wrArray[11].FantasyPts;
    result.RzTargets = (wrArray[11].Rec_Tar_Rz_In_5 + wrArray[11].Rec_Tar_Rz_In_10 + wrArray[11].Rec_Tar_Rz_In_20);
    return result;
  },
  calcWeeklyAvg: (stat, rank) => {
    var result = [];
    for (var i = 1; i <= 16; i++){
      // var obj = wrTargetUtil.getWrOneFromWeek(i);
      // var obj = wrTargetUtil.getWrTwelveFromWeek(i);
      var obj = wrTargetUtil.getWrRankFromWeek(i, rank);
      var rounded = Math.round(obj[stat]);
      // console.log(`week ${i}'s avg is - ${rounded}`);
      result.push(rounded);
    }
    return result;
  },
  getWrAllWeeks: (name) => {
    var result = {};
    for (var i = 1; i <= 16; i++){
      result[i] = wrTargetUtil.getWrFromWeek(name, i);
    }
    return result;
  },
  getAllWidereceivers: () => {
    return widereceivers;
    // returns an array of all wrs
  },
  calcWeeklyTotal: (player, stat) => {
    // used to calc weekly target/ftpts/td for combo chart
    // manually calc TotalTd from (recTd + rushTd)
    console.log('=----> player - ', player);
    var result = [];
    for (var week in player){
      if (stat === "RzTargets"){
        if (player[week]){
          var five = player[week]["Rec_Tar_Rz_In_5"];
          var ten = player[week]["Rec_Tar_Rz_In_10"];
          var twenty = player[week]["Rec_Tar_Rz_In_20"];
          var total = five + ten + twenty;
          console.log(five, ten, twenty, total);
          // var totalTargets = player[week]["Rec_Tar_Rz_In_5"] + player[week]["Rec_Tar_Rz_In_10"] + player[week]["Rec_Tar_Rz_In_20"];
          // console.log(`rec td = ${player[week]["Rec_Td"]} and rush td = ${rushTd} and total = ${player[week]["Rec_Td"] + rushTd}`)
          // result.push(player[week]["Rec_Tar_Rz_In_5"] + player[week]["Rec_Tar_Rz_In_10"] + player[week]["Rec_Tar_Rz_In_20"]);
          result.push(total);
        }
        else
          result.push(null);
      } else {
        if (player[week])
          result.push(player[week][stat]);
        else
          result.push(null);
      }
    }
    console.log(`result for ${stat} - ', result`, result);
    return result;
  },
  get: (id) => {
    var options = {keys: ['PLayer_2'], threshold: 0.3};
    var fuse = new Fuse(wideReceiverObj, options);
    // returns an array w/ results (hopefully only 1 result)
    return fuse.search(id);
  },
  convertToPercent: (fraction) => {
    return Math.round(fraction * 10000) / 100;
  }
};

export default wrTargetUtil;