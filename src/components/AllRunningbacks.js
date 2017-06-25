import React from 'react';
import {Link} from 'react-router-dom';
import RbRedzoneUtil from '../util/rbRedzoneUtil';

console.log('--> ALL RBS in component - ', RbRedzoneUtil.all());
const AllRunningbacks = () => (
  <div>
    <ul>
      {
        RbRedzoneUtil.all().map(runningback => (
          <li key={runningback.Name}>
            <Link to={`/runningbacks/${runningback.Name.split(' ').join('_')}`}>{runningback.Name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default AllRunningbacks;
