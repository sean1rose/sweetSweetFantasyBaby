import teams from '../../ffdata/2016_team_stats/2016_team_stats.json';
import Fuse from 'fuse.js';
// http://fusejs.io/

const teamSeason2016 = {
  all: () => { 
    console.log('teams stats in an array - ', teams);
    // returns an array
    return teams;
  },
  allSortedBy: (stat) => {
    return teams.sort((a,b) => {
      // "Rush_Rz_In_5"
      console.log('stat -', stat);
      return b[stat] - a[stat];
    });
  },
  teamObj: () => {
    var result = {};
    teamSeason2016.all().map((item) => {
      result[item.Team] = item;
      // result.push(item);
    });
    // returns an obj
    return result;
  },
  getSingleTeam: (name) => {
    return teamSeason2016.teamObj()[name];
  },
  get: (id) => {
    var options = {keys: ['Team'], threshold: 0.3};
    var fuse = new Fuse(teams, options);
    // returns an array w/ results (hopefully only 1 result)
    return fuse.search(id);
  },
  convertToPercent: (fraction) => {
    return Math.round(fraction * 10000) / 100;
  }
};

export default teamSeason2016;