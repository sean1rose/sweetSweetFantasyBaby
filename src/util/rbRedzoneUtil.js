import runningbacks from '../../ffdata/2016_rb_stats/2016_rb_stats.json';
import Fuse from 'fuse.js';
// http://fusejs.io/

const rbRedzoneUtil = {
  all: () => { 
    console.log('runningbacks in util - ', runningbacks);
    return runningbacks;
  },
  rbObj: () => {
    var result = {};
    rbRedzoneUtil.all().map((item) => {
      result[item.Name] = item;
      // result.push(item);
    });
    return result;
  },
  getSingleRb: (name) => {
    return rbRedzoneUtil.rbObj()[name];
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

export default rbRedzoneUtil;