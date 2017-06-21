import React from 'react';
import {Link} from 'react-router-dom';
import TeamTargetDistribution from '../util/getTeamTargetDist';

console.log('--> ALL TEAMS - ', TeamTargetDistribution.getAllTeams());
// ALL TEAMS === FULLROSTER
const AllTeams = () => (
  <div>
    <ul>
      {
        TeamTargetDistribution.getAllTeams().map(team => (
          <li key={team.name}>
            {/*<span>{team.name}</span>*/}
            <Link to={`/teams/${team.abr}`}>{team.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
);

export default AllTeams;
