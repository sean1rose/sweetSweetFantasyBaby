import redzoneRunningbacks from '../../ffdata/2016_rb_stats/rb_redzone_2016.json';
import seasonRbs from '../../ffdata/2016_rb_stats/2016_runningback_stats.json';
import teamSeason2016 from './teamSeason2016';
import Fuse from 'fuse.js';
// http://fusejs.io/

const rbRedzone2016Stats = {
  all: () => { 
    // console.log('redzoneRunningbacks redzone stats in an array - ', redzoneRunningbacks);
    // returns an array
    return redzoneRunningbacks;
  },
  allSortedBy: (stat) => {
    return redzoneRunningbacks.sort((a,b) => {
      // "Rush_Rz_In_5"
      return b[stat] - a[stat];
    });
  },
  rbObj: () => {
    var result = {};
    rbRedzone2016Stats.all().map((item) => {
      result[item.Player] = item;
      // result.push(item);
    });
    // returns an obj
    return result;
  },
  getSingleRb: (name) => {
    // console.log('getSingleRb - ', rbRedzone2016Stats.rbObj()[name]);
    return rbRedzone2016Stats.rbObj()[name];
  },
  getRbAvgForCategory: (category, rank) => {
    // category="Rush_Rz_In_5"
    // rank=1 or rank=3
    var counter1 = rank === 1 ? 0 : rank === 2 ? 12 : 24;
    var counter2 = rank === 1 ? 12 : rank === 2 ? 24 : 36;
    console.log(category, counter1, counter2);
    var sum = 0;
    for (var i = counter1; i < counter2; i++){
      var currentSeasonRb = seasonRbs[i];
      // console.log('---> currentSeasonRb - ', currentSeasonRb.Name, currentSeasonRb);
      var currentRedzoneRb = rbRedzone2016Stats.getSingleRb(currentSeasonRb.Name);
      sum += currentRedzoneRb[category];
    }
    return (sum / 12);
    // getRbOneAvgForCategory: (category) => {
    //   var sum = 0;
    //   for (var i = 0; i < 12; i++){
    //     var current = seasonRbs[i];
    //     sum += current[category];
    //   }
    //   return (sum / 12);
    // }
  },
  getTopRbInCategory: (category) => {
    var sorted = redzoneRunningbacks.sort((a,b) => {
      return b[category] - a[category];
    });
    // add team to object...
    var teamData = teamSeason2016.getSingleTeam(sorted[0].Team);
    sorted[0].teamData = teamData;
    return sorted[0];
  },
  get: (id) => {
    var options = {keys: ['PLAYER'], threshold: 0.3};
    var fuse = new Fuse(redzoneRunningbacks, options);
    // returns an array w/ results (hopefully only 1 result)
    return fuse.search(id);
  },
  convertToPercent: (fraction) => {
    return Math.round(fraction * 10000) / 100;
  }
};

export default rbRedzone2016Stats;