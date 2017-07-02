import React from 'react';
import {Link} from 'react-router-dom';
// import rb2016SeasonStats from '../util/rb2016SeasonStats';
import rbRedzone2016Stats from '../util/rbRedzone2016';
import teamSeason2016 from '../util/teamSeason2016';
import Barchart from './charts/Barchart';

const Runningback = (props) => {
  console.log('in runningback.js - props - ', props);
  var name = props.match.params.name.split('_').join(' ');
  var player = rbRedzone2016Stats.getSingleRb(name);
  var team = teamSeason2016.getSingleTeam(player.Team);
  console.log('player - ', player);
  console.log('team - ', team);
  console.log('getRbAvgForCategory - ', rbRedzone2016Stats.getRbAvgForCategory("Rush_Rz_In_20_Car", 1));

  if (!player) {
    return <div>Sorry no runningback was found</div>
  }
  return (
    <div>
      <div >
        <h1>{name}</h1>
        <span>Carries from w/in the 5 yard line: </span><span><b>{player.Rush_Rz_In_5_Car}</b></span>
        <br/>
        <span>Carries from w/in the 10 yard line: </span><span><b>{player.Rush_Rz_In_10_Car}</b></span>
        <br/>
        <span>Redzone Carries (w/in 20 yard line) : </span><span><b>{player.Rush_Rz_In_20_Car}</b></span>
      </div>
      <Barchart player={player} team={team} marker={5} redzoneUtil={rbRedzone2016Stats} teamUtil={teamSeason2016}/>
      <Barchart player={player} team={team} marker={10} redzoneUtil={rbRedzone2016Stats} teamUtil={teamSeason2016} />
      <Barchart player={player} team={team} marker={20} redzoneUtil={rbRedzone2016Stats} teamUtil={teamSeason2016} />
      {/*<Donutchart teamName={teamName} team={teamPlayersTargetsArray} util={TeamTargetUtil} />*/}
    </div>
  )
};

export default Runningback;