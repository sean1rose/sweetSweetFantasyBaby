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

const TeamTargetDistribution = {
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
    return TeamTargetDistribution.getTeamPositionTargets(team, "ALL");
  },
  getTeamRbTargets: (team) => {
    return TeamTargetDistribution.getTeamPositionTargets(team, "RB") + TeamTargetDistribution.getTeamPositionTargets(team, "FB");
  },
  rbTargetPercentage: (team) => {
    return (TeamTargetDistribution.getTeamRbTargets(team) / TeamTargetDistribution.getTeamTotalTargets(team));
  },
  getTeamWrTargets: (team) => {
    return TeamTargetDistribution.getTeamPositionTargets(team, "WR");
  },
  wrTargetPercentage: (team) => {
    return (TeamTargetDistribution.getTeamWrTargets(team) / TeamTargetDistribution.getTeamTotalTargets(team));
  },
  getTeamTeTargets: (team) => {
    return TeamTargetDistribution.getTeamPositionTargets(team, "TE");
  },
  teTargetPercentage: (team) => {
    return (TeamTargetDistribution.getTeamTeTargets(team) / TeamTargetDistribution.getTeamTotalTargets(team));
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
    if (TeamTargetDistribution.getTeamOtherTargets(team))
      return (TeamTargetDistribution.getTeamOtherTargets(team) / TeamTargetDistribution.getTeamTotalTargets(team));
    else
      return 0;
  },
  getAllTeams: () => {
    return [
      {name: "Arizona Cardinals", abr: "arz"},
      {name: "Atlanta Falcons", abr: "atl"},
      {name: "Baltimore Ravens", abr: "bal"},
      {name: "Buffalo Bills", abr: "buf"},
      {name: "Carolina Panthers", abr: "car"},
      {name: "Chicago Bears", abr: "chi"},
      {name: "Cincinati Bengals", abr: "cin"},
      {name: "Cleveland Browns", abr: "cle"},
      {name: "Dallas Cowboys", abr: "dal"},
      {name: "Denver Broncos", abr: "den"},
      {name: "Detroit Lions", abr: "det"},
      {name: "Green Bay Packers", abr: "gb"},
      {name: "Houston Texans", abr: "hou"},
      {name: "Indianopolis Colts", abr: "ind"},
      {name: "Jacksonville Jaguars", abr: "jax"},
      {name: "Kansas City Chiefs", abr: "kc"},
      {name: "Los Angeles Rams", abr: "lar"},
      {name: "Miami Dolphins", abr: "mia"},
      {name: "Minnesota Vikings", abr: "min"},
      {name: "New England Patriots", abr: "ne"},
      {name: "New Orleans Saints", abr: "no"},
      {name: "New York Giants", abr: "nyg"},
      {name: "New York Jets", abr: "nyj"},
      {name: "Oakland Raiders", abr: "oak"},
      {name: "Philadelphia Eagles", abr: "phi"},
      {name: "Pittsburgh Steelers", abr: "pit"},
      {name: "San Diego Chargers", abr: "sd"},
      {name: "Seattle Seahwaks", abr: "sea"},
      {name: "San Francisco 49ers", abr: "sf"},
      {name: "Tampa Bay Buccaneers", abr: "tb"},
      {name: "Tennessee Titans", abr: "ten"},
      {name: "Washington Redskins", abr: "was"} 
    ]
  },

};

export default TeamTargetDistribution;
