import React from 'react';
import {Link} from 'react-router-dom';
import TeamTargetUtil from '../util/teamTargetUtil';

// console.log('--> ALL TEAMS - ', TeamTargetUtil.getAllTeams());
// ALL TEAMS === FULLROSTER
const AllTeams = () => (
  <div>
    <ul>
      {
        TeamTargetUtil.getAllTeams().map(team => (
          <li key={team.name}>
            <Link to={`/teams/${team.abr}`}>{team.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default AllTeams;
