import React from 'react';
import {Link} from 'react-router-dom';
import rb2016SeasonStats from '../util/rb2016SeasonStats';
import rbRedzone2016Stats from '../util/rbRedzone2016';
import rbWeeklyTouchesUtil from '../util/rbWeeklyTouchesUtil';

// console.log('--> ALL RBS in component - ', rb2016SeasonStats.all());
console.log('$$$$ - ', rbWeeklyTouchesUtil.getAllRunningbacks());
const AllRunningbacks = () => (
  <div>
    <ul>
      {
        rbWeeklyTouchesUtil.getAllRunningbacks().map(runningback => (
          <li key={runningback.Player}>
            <Link to={`/runningbacks/${runningback.Player.split(' ').reverse().join('_')}`}>{runningback.Player.split(' ').reverse().join(' ')}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default AllRunningbacks;
