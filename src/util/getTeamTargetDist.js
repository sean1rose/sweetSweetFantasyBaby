// import arzPlayers from '../../ffdata/2016_team_targets/arz_2016_targets_season.json';
import Fuse from 'fuse.js';
// http://fusejs.io/

/* 
NEED:
  - team's TOTAL targets
  - add up all rb + fb targets
  - add up all wr targets
  - add up all te targets
  - other
*/

const getTeamTargetDistribution = {
  getAllTeamsPlayersTargets: (team) => {
    // pass in team -> team is an array of player-objects
    return team;
  },
  numberOfPlayersOnTeam: () => {
    return team.length;
  },
  getTeamPositionTargets: (team, position) => {
    // main util function...
    var positionTargets = 0;
    if (position === "ALL"){
      team.forEach((player) => {
        positionTargets += player.Targets;
      });
      return positionTargets;
    }
    team.forEach((player) => {
      if (player["Pos."] === position){
        positionTargets += player.Targets;
      }
    });
    return positionTargets;
  },
  getTeamTotalTargets: (team) => {
    // team is an array of player-objects. want to iterate thru each object and add up all "Targets"-properties
    return getTeamTargetDistribution.getTeamPositionTargets(team, "ALL");
  },
  getTeamRbTargets: (team) => {
    return getTeamTargetDistribution.getTeamPositionTargets(team, "RB") + getTeamTargetDistribution.getTeamPositionTargets(team, "FB");
  },
  rbTargetPercentage: (team) => {
    return (getTeamTargetDistribution.getTeamRbTargets(team) / getTeamTargetDistribution.getTeamTotalTargets(team));
  },
  getTeamWrTargets: (team) => {
    return getTeamTargetDistribution.getTeamPositionTargets(team, "WR");
  },
  wrTargetPercentage: (team) => {
    return (getTeamTargetDistribution.getTeamWrTargets(team) / getTeamTargetDistribution.getTeamTotalTargets(team));
  },
  getTeamTeTargets: (team) => {
    return getTeamTargetDistribution.getTeamPositionTargets(team, "TE");
  },
  teTargetPercentage: (team) => {
    return (getTeamTargetDistribution.getTeamTeTargets(team) / getTeamTargetDistribution.getTeamTotalTargets(team));
  },
  getTeamOtherTargets: (team) => {
    var otherTargets = 0;
    team.forEach((player) => {
      if (player["Pos."] !== "RB" || player["Pos."] !== "FB" || player["Pos."] !== "WR" || player["Pos."] !== "TE"){
        otherTargets += player.Targets;
      }
    });
    return otherTargets;
  },
  otherTargetPercentage: (team) => {
    if (getTeamTargetDistribution.getTeamOtherTargets(team))
      return (getTeamTargetDistribution.getTeamOtherTargets(team) / getTeamTargetDistribution.getTeamTotalTargets(team));
    else
      return 0;
  }

};

export default getTeamTargetDistribution;
