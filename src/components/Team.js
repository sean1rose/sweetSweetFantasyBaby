import React from 'react';
import {Link} from 'react-router-dom';
import TeamTargetUtil from '../util/teamTargetUtil';
import Donutchart from './charts/Donutchart';

import arzPlayers from '../../ffdata/2016_team_targets/arz_2016_targets_season.json';
import atlPlayers from '../../ffdata/2016_team_targets/atl_2016_targets_season.json';
import balPlayers from '../../ffdata/2016_team_targets/bal_2016_targets_season.json';
import bufPlayers from '../../ffdata/2016_team_targets/buf_2016_targets_season.json';
import carPlayers from '../../ffdata/2016_team_targets/car_2016_targets_season.json';
import chiPlayers from '../../ffdata/2016_team_targets/chi_2016_targets_season.json';
import clePlayers from '../../ffdata/2016_team_targets/cle_2016_targets_season.json';
import dalPlayers from '../../ffdata/2016_team_targets/dal_2016_targets_season.json';
import denPlayers from '../../ffdata/2016_team_targets/den_2016_targets_season.json';
import detPlayers from '../../ffdata/2016_team_targets/det_2016_targets_season.json';
import gbPlayers from '../../ffdata/2016_team_targets/gb_2016_targets_season.json';
import houPlayers from '../../ffdata/2016_team_targets/hou_2016_targets_season.json';
import indPlayers from '../../ffdata/2016_team_targets/ind_2016_targets_season.json';
import jaxPlayers from '../../ffdata/2016_team_targets/jax_2016_targets_season.json';
import kcPlayers from '../../ffdata/2016_team_targets/kc_2016_targets_season.json';
import larPlayers from '../../ffdata/2016_team_targets/lar_2016_targets_season.json';
import miaPlayers from '../../ffdata/2016_team_targets/mia_2016_targets_season.json';
import minPlayers from '../../ffdata/2016_team_targets/min_2016_targets_season.json';
import nePlayers from '../../ffdata/2016_team_targets/ne_2016_targets_season.json';
import noPlayers from '../../ffdata/2016_team_targets/no_2016_targets_season.json';
import nygPlayers from '../../ffdata/2016_team_targets/nyg_2016_targets_season.json';
import nyjPlayers from '../../ffdata/2016_team_targets/nyj_2016_targets_season.json';
import oakPlayers from '../../ffdata/2016_team_targets/oak_2016_targets_season.json';
import phiPlayers from '../../ffdata/2016_team_targets/phi_2016_targets_season.json';
import pitPlayers from '../../ffdata/2016_team_targets/pit_2016_targets_season.json';
import sdPlayers from '../../ffdata/2016_team_targets/sd_2016_targets_season.json';
import seaPlayers from '../../ffdata/2016_team_targets/sea_2016_targets_season.json';
import sfPlayers from '../../ffdata/2016_team_targets/sf_2016_targets_season.json';
import tbPlayers from '../../ffdata/2016_team_targets/tb_2016_targets_season.json';
import tenPlayers from '../../ffdata/2016_team_targets/ten_2016_targets_season.json';
import wasPlayers from '../../ffdata/2016_team_targets/was_2016_targets_season.json';

const allTeamUtilFunctions = {
  arzPlayers, atlPlayers, balPlayers, bufPlayers, carPlayers, chiPlayers, clePlayers, dalPlayers, denPlayers, detPlayers, gbPlayers, houPlayers,
  indPlayers, jaxPlayers, kcPlayers, larPlayers, miaPlayers, minPlayers, nePlayers, noPlayers, nygPlayers, nyjPlayers, oakPlayers, phiPlayers,
  pitPlayers, sdPlayers, seaPlayers, sfPlayers, tbPlayers, tenPlayers, wasPlayers
}

const Team = (props) => {
  console.log('team props - ', props);
  var teamAbr = props.match.params.abr;
  var teamPlayers = `${teamAbr}Players`;
  // team
  var team = allTeamUtilFunctions[teamPlayers];
  console.log('issa team - ', team);
  var teamName;
  // var teamName = TeamTargetUtil.getTeam(teamAbr).name;
  console.log('team11111 - ', TeamTargetUtil.getTeam(teamAbr));
  TeamTargetUtil.getAllTeams().map((team) => {
    if (team.abr === teamAbr){
      teamName = team.name
      console.log('ISSA MATCH - ', team, team.name);
    }
  })

  const teamPlayersTargetsArray = TeamTargetUtil.getAllTeamsPlayersTargets(team);
  const teamTotalTargets = TeamTargetUtil.getTeamTotalTargets(team);
  console.log('----> TEAM!!!! - ', teamPlayersTargetsArray, team);
  if (!team) {
    return <div>Sorry no team was found</div>
  }
  return (
    <div>
      <h1>{teamName}</h1>
      <Donutchart teamName={teamName} team={teamPlayersTargetsArray} util={TeamTargetUtil} />
    </div>
  )
};

export default Team;