import React from 'react';
import {Link} from 'react-router-dom';
import PlayerApi from './PlayerApi';

const FullRoster = () => (
  <div>
    <ul>
      {
        PlayerApi.all().map(p => (
          <li key={p.number}>
            <Link to={`/roster/${p.number}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default FullRoster;
