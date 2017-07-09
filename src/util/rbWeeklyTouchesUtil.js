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
    return result;
    // return obj of rbs for that week
  },
  getRbFromWeek: (name, week) => {
    // need single rb-obj from a week
    var weekRunningbacks = rbWeeklyTouchesUtil.runningbackWeek(week);
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
      // console.log('>>>>>>>> i - ', i);
      // console.log('>>>>>>>> rbArray[i] - ', rbArray[i]);
      // console.log('2 >>>>>>>> 2 rbArray[i].Rush_Att - ', rbArray[i].Rush_Att);
      // console.log('3 >>>>>>>> 3 rbArray[i].Rec_Tar_Rz_In_20 - ', rbArray[i].Rec_Tar_Rz_In_20);
      result.touches += rbArray[i].Rush_Att;
      result.touches += rbArray[i].Rec;
      result.fantasyPts += rbArray[i].FantasyPts;

      result.rzTouches = !rbArray[i].Rec_Tar_Rz_In_20 ? rbArray[i].Rush_Rz_In_20 : (rbArray[i].Rush_Rz_In_20 + rbArray[i].Rec_Tar_Rz_In_20);

      // result.rzTouches += rbArray[i].Rush_Rz_In_20;
      // if (rbArray[i].Rec_Tar_Rz_In_20)
      //   result.rzTouches += rbArray[i].Rec_Tar_Rz_In_20;
      // console.log('4 >>>>>>>> 4 rbArray[i].rzTouches - ', result.rzTouches);
    }
    var avg = {};
    avg.Touches = (result.touches / 12);
    avg.FantasyPts = (result.fantasyPts / 12);
    avg.RzTouches = (result.rzTouches / 12);
    console.log('>>>>>avg = ', avg);
    return avg;
  },
  getRbTwelveFromWeek: (weekNumber) => {
    var rbString = `rb${weekNumber}`;
    var rbArray = runningbackObj[rbString];
    var result = {};
    result.Touches = (rbArray[11].Rush_Att + rbArray[11].Rec);
    result.FantasyPts = rbArray[11].FantasyPts;
    result.RzTouches = !rbArray[11].Rec_Tar_Rz_In_20 ? rbArray[11].Rush_Rz_In_20 : (rbArray[11].Rush_Rz_In_20 + rbArray[11].Rec_Tar_Rz_In_20);
    // result.RzTouches = (rbArray[11].Rush_Rz_In_20 + rbArray[11].Rec_Tar_Rz_In_20);
    return result;
  },
  calcWeeklyAvg: (stat, rank) => {
    var result = [];
    if (rank === 1.12){
      for (var i = 1; i <= 16; i++){
        result.push(rbWeeklyTouchesUtil.getRbTwelveFromWeek(i)[stat])
      }
      // console.log('----> RESULT - ', result);
      return result;
    }
    for (var i = 1; i <= 16; i++){
      // var obj = rbWeeklyTouchesUtil.getWrOneFromWeek(i);
      // var obj = rbWeeklyTouchesUtil.getRbTwelveFromWeek(i);
      var obj = rbWeeklyTouchesUtil.getRbRankFromWeek(i, rank);
      var rounded = Math.round(obj[stat]);
      console.log(`week ${i}'s avg ${stat} is - ${rounded}`);
      result.push(rounded);
    }
    // console.log('---- stat - ', stat, ' rank - ', rank);
    // console.log('----result - ', result);
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
    console.log('=----> player - ', player);
    var result = [];
    for (var week in player){
      if (stat === "RzTouches"){
        if (player[week]){
          // var five = player[week]["Rec_Tar_Rz_In_5"];
          // var ten = player[week]["Rec_Tar_Rz_In_10"];
          var twenty = !player[week]["Rush_Rz_In_20"] ? player[week]["Rec_Tar_Rz_In_20"] : (player[week]["Rec_Tar_Rz_In_20"] + player[week]["Rush_Rz_In_20"]);
          // var twenty = (player[week]["Rec_Tar_Rz_In_20"] + player[week]["Rush_Rz_In_20"]);
          // var total = five + ten + twenty;
          // console.log(five, ten, twenty, total);
          // var totalTargets = player[week]["Rec_Tar_Rz_In_5"] + player[week]["Rec_Tar_Rz_In_10"] + player[week]["Rec_Tar_Rz_In_20"];
          // console.log(`rec td = ${player[week]["Rec_Td"]} and rush td = ${rushTd} and total = ${player[week]["Rec_Td"] + rushTd}`)
          // result.push(player[week]["Rec_Tar_Rz_In_5"] + player[week]["Rec_Tar_Rz_In_10"] + player[week]["Rec_Tar_Rz_In_20"]);
          result.push(twenty);
        }
        else
          result.push(null);
      } else {
        if (player[week]){
          console.log('!!!!!! [stat] - ', stat);
          console.log('!!!!!! player - ',player);
          console.log('!!!!!! player[week] - ',player[week]);
          console.log('!!!!!! player[week][stat] - ',player[week][stat]);
          if (stat === "Touches"){
            result.push(player[week]["Rush_Att"] + player[week]["Rec"]);
          } else {
            result.push(player[week][stat]);

          }
        }
        else
          result.push(null);
      }
    }
    console.log(`result for ${stat} - ', result`, result);
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
  }
};

export default rbWeeklyTouchesUtil;