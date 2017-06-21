import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AllTeams from './AllTeams';
import Team from './Team';
// import Player from './Player';
console.log('TEAMS! file - ', Team);

const Teams = () => (
  <div>
    <Switch>
      <Route exact path='/teams' component={AllTeams}/>
      <Route path='/teams/:abr' component={Team}/>
    </Switch>
  </div>
);

export default Teams;