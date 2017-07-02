import React from 'react';
import {Link} from 'react-router-dom';
import rb2016SeasonStats from '../util/rb2016SeasonStats';
import rbRedzone2016Stats from '../util/rbRedzone2016';

// console.log('--> ALL RBS in component - ', rb2016SeasonStats.all());
console.log('$$$$ - ', rbRedzone2016Stats.all());
const AllRunningbacks = () => (
  <div>
    <ul>
      {
        rbRedzone2016Stats.allSortedBy("Rush_Rz_In_20_Car").map(runningback => (
          <li key={runningback.Player}>
            <Link to={`/runningbacks/${runningback.Player.split(' ').join('_')}`}>{runningback.Player}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default AllRunningbacks;
