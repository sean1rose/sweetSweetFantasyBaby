import React from 'react';
import {Link} from 'react-router-dom';
import TeamTargetDistribution from '../util/getTeamTargetDist';
// var teamString = `../../ffdata/2016_team_targets/${team.abr}_2016_targets_season.json`;

const Team = (props) => {
  console.log('team props - ', props);
  // const team = TeamTargetDistribution.getTeamTotalTargets()
  // const player = PlayerApi.get(
  //   parseInt(props.match.params.number, 10)
  // )
  // if (!player) {
  //   return <div>Sorry no player was found</div>
  // }
  return (
    <div>
      {/*<h1>{player.name}(#{player.number})</h1>
      <h2>Position: {player.position}</h2>*/}
      {/*<Link to='/teams'>Back</Link>*/}
    </div>
  )
};

export default Team;