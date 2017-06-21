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
      {name: "Arizona Cardinals", abr: "ARZ"},
      {name: "Atlanta Falcons", abr: "ATL"},
      {name: "Baltimore Ravens", abr: "BAL"},
      {name: "Buffalo Bills", abr: "BUF"},
      {name: "Carolina Panthers", abr: "CAR"},
      {name: "Chicago Bears", abr: "CHI"},
      {name: "Cincinati Bengals", abr: "CIN"},
      {name: "Cleveland Browns", abr: "CLE"},
      {name: "Dallas Cowboys", abr: "DAL"},
      {name: "Denver Broncos", abr: "DEN"},
      {name: "Detroit Lions", abr: "DET"},
      {name: "Green Bay Packers", abr: "GB"},
      {name: "Houston Texans", abr: "HOU"},
      {name: "Indianopolis Colts", abr: "IND"},
      {name: "Jacksonville Jaguars", abr: "JAX"},
      {name: "Kansas City Chiefs", abr: "KC"},
      {name: "Los Angeles Rams", abr: "LAR"},
      {name: "Miami Dolphins", abr: "MIA"},
      {name: "Minnesota Vikings", abr: "MIN"},
      {name: "New England Patriots", abr: "NE"},
      {name: "New Orleans Saints", abr: "NO"},
      {name: "New York Giants", abr: "NYG"},
      {name: "New York Jets", abr: "NYJ"},
      {name: "Oakland Raiders", abr: "OAK"},
      {name: "Philadelphia Eagles", abr: "PHI"},
      {name: "Pittsburgh Steelers", abr: "PIT"},
      {name: "San Diego Chargers", abr: "SD"},
      {name: "Seattle Seahwaks", abr: "SEA"},
      {name: "San Francisco 49ers", abr: "SF"},
      {name: "Tampa Bay Buccaneers", abr: "TB"},
      {name: "Tennessee Titans", abr: "TEN"},
      {name: "Washington Redskins", abr: "WAS"} 
    ]
  },

};

export default TeamTargetDistribution;
