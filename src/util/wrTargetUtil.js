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
      wr[`week_${weekNumber}_rank`] = idx + 1;
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
  getAllWidereceivers: () => {
    return widereceivers;
    // returns an array of all wrs
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