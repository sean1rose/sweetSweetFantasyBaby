// import runningbacks from '../../ffdata/2016_rb_stats/2016_rb_stats.json';
import runningbacks from '../../ffdata/2016_rb_stats/2016_runningback_stats.json';
import Fuse from 'fuse.js';
// http://fusejs.io/

const rb2016SeasonStats = {
  all: () => { 
    console.log('runningbacks in util - ', runningbacks);
    return runningbacks;
  },
  allSorted: () => {
    return runningbacks.sort((a,b) => {
      return b["Rush_Rz_In_20"] - a["Rush_Rz_In_20"];
    });
  },
  rbObj: () => {
    var result = {};
    rb2016SeasonStats.all().map((item) => {
      result[item.Name] = item;
      // result.push(item);
    });
    return result;
  },
  getSingleRb: (name) => {
    return rb2016SeasonStats.rbObj()[name];
  },
  get: (id) => {
    var options = {keys: ['PLAYER'], threshold: 0.3};
    var fuse = new Fuse(runningbacks, options);
    // returns an array w/ results (hopefully only 1 result)
    return fuse.search(id);
  },
  convertToPercent: (fraction) => {
    return Math.round(fraction * 10000) / 100;
  }
};

export default rb2016SeasonStats;