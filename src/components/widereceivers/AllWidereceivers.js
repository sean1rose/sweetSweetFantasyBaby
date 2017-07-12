import React from 'react';
import {Link} from 'react-router-dom';
import wrWeeklyTargetUtil from '../../util/wrWeeklyTargetUtil';

console.log('--->>>> wr on a weekly - ', wrWeeklyTargetUtil.getWrFromWeek('Brandin Cooks', 1))
const AllWidereceivers = () => (
  <div>
    <ul>
      {
        wrWeeklyTargetUtil.getAllWidereceivers().map(wr => (
          <li key={wr.Player}>
            <Link to={`/widereceivers/${wr.Player.split(' ').reverse().join('_')}`}>{wr.Player.split(' ').reverse().join(' ')}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default AllWidereceivers;
