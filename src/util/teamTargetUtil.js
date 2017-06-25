/* 
NEED:
  - team's TOTAL targets
  - add up all rb + fb targets
  - add up all wr targets
  - add up all te targets
  - other
*/

const TeamTargetUtil = {
  getAllTeamsPlayersTargets: (team) => {
    // pass in team as argument -> team is an array of player-objects, sorted by RBs first, 2nd == WRs, 3rd == TEs, 4th == all others
    var result = [];
    for (var i = 0; i < team.length; i++){
      if (team[i]["Pos."] === "RB" || team[i]["Pos."] === "FB"){
        result.push(team[i]);
      }
    }
    for (var i = 0; i < team.length; i++){
      if (team[i]["Pos."] === "WR"){
        result.push(team[i]);
      }
    }
    for (var i = 0; i < team.length; i++){
      if (team[i]["Pos."] === "TE"){
        result.push(team[i]);
      }
    }
    for (var i = 0; i < team.length; i++){
      if (team[i]["Pos."] !== "RB" && team[i]["Pos."] !== "FB" && team[i]["Pos."] !== "WR" && team[i]["Pos."] !== "TE"){
        result.push(team[i]);
      }
    }
    // console.log('*FINAL RESULT - ', result);
    return result;
  },
  numberOfPlayersOnTeam: () => {
    return team.length;
  },
  getTeamPositionTargets: (team, position) => {
    // main HELPER util function...
      // iterate thru array of player objects...
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
  getPlayersAtPosition: (team, position, position2) => {
    // helper util func to get list of team's players at a position...
    var posObj = {};
    team.forEach((player) => {
      if (player["Pos."] === position || (position2 && player["Pos."] === position2)){
        posObj[player.Name] = player;
      }
    });
    return posObj;
  },
  getTeamTotalTargets: (team) => {
    // team is an array of player-objects. want to iterate thru each object and add up all "Targets"-properties
    return TeamTargetUtil.getTeamPositionTargets(team, "ALL");
  },
  getTeamRbTargets: (team) => {
    return TeamTargetUtil.getTeamPositionTargets(team, "RB") + TeamTargetUtil.getTeamPositionTargets(team, "FB");
  },
  rbTargetPercentage: (team) => {
    var convertToPercent = function(fraction){
      return Math.round(fraction * 10000) / 100;
    };
    var targetPercentage = TeamTargetUtil.getTeamRbTargets(team) / TeamTargetUtil.getTeamTotalTargets(team);
    // console.log('----> rb - ', convertToPercent(targetPercentage));
    return (TeamTargetUtil.getTeamRbTargets(team) / TeamTargetUtil.getTeamTotalTargets(team));
  },
  getTeamRbs: (team) => {
    // loop thru players array, for every "Pos." === "RB" or "FB" --> add to rbObj
    return TeamTargetUtil.getPlayersAtPosition(team, "RB", "FB");
  },
  getRbProperty: (team, property) => {
    // return array of rbs
    // console.log('getrbprop team - ', team);
    var result = [];
    team.forEach((player) => {
      if (player["Pos."] === "RB" || player["Pos."] === "FB"){
        result.push(player[property]);
      }
    });
    return result;
  },
  getTeamWrTargets: (team) => {
    return TeamTargetUtil.getTeamPositionTargets(team, "WR");
  },
  wrTargetPercentage: (team) => {
    var targetPercentage = TeamTargetUtil.getTeamWrTargets(team) / TeamTargetUtil.getTeamTotalTargets(team);
    // console.log('----> wr - ', targetPercentage);
    return (TeamTargetUtil.getTeamWrTargets(team) / TeamTargetUtil.getTeamTotalTargets(team));
  },
  getTeamWrs: (team) => {
    return TeamTargetUtil.getPlayersAtPosition(team, "WR");
  },
  getWrProperty: (team, property) => {
    // return array of rbs
    var result = [];
    team.forEach((player) => {
      if (player["Pos."] === "WR"){
        result.push(player[property]);
      }
    });
    return result;
  },
  getTeamTeTargets: (team) => {
    return TeamTargetUtil.getTeamPositionTargets(team, "TE");
  },
  teTargetPercentage: (team) => {
    var targetPercentage = TeamTargetUtil.getTeamTeTargets(team) / TeamTargetUtil.getTeamTotalTargets(team);
    // console.log('----> te - ', targetPercentage);
    return (TeamTargetUtil.getTeamTeTargets(team) / TeamTargetUtil.getTeamTotalTargets(team));
  },
  getTeProperty: (team, property) => {
    var result = [];
    team.forEach((player) => {
      if (player["Pos."] === "TE"){
        result.push(player[property]);
      }
    });
    return result;
  },
  getTeamTes: (team) => {
    return TeamTargetUtil.getPlayersAtPosition(team, "TE");
  },
  getTeamOtherTargets: (team) => {
    var otherTargets = 0;
    team.forEach((player) => {
      if (player["Pos."] !== "RB" && player["Pos."] !== "FB" && player["Pos."] !== "WR" && player["Pos."] !== "TE"){
        otherTargets += player.Targets;
      }
    });
    return otherTargets;
  },
  otherTargetPercentage: (team) => {
    // console.log('-----> other - ', TeamTargetUtil.getTeamOtherTargets(team) / TeamTargetUtil.getTeamTotalTargets(team));
    if (TeamTargetUtil.getTeamOtherTargets(team))
      return (( TeamTargetUtil.getTeamOtherTargets(team) / TeamTargetUtil.getTeamTotalTargets(team) ) * .01);
    else
      return 0;
  },
  getOtherProperty: (team, property) => {
    var result = [];
    team.forEach((player) => {
      if (player["Pos."] !== "RB" && player["Pos."] !== "FB" && player["Pos."] !== "WR" && player["Pos."] !== "TE"){
        result.push(player[property]);
      }
    });
    return result;
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
  getTeam: (abr) => {
    TeamTargetUtil.getAllTeams().forEach((team) => {
      if (abr === team.abr){
        return team;
      }
    })
  }

};

export default TeamTargetUtil;
