import React from 'react';
// switch renders 1 specific route instead of all the routes that are active
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Roster from './Roster';
import Schedule from './Schedule';
import Teams from './Teams';
import Battle from './Battle';
import Results from './Results';

const App = () => {
  return (
    <BrowserRouter >
      <div>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/roster' component={Roster} />
          <Route path='/schedule' component={Schedule} />
          <Route path='/teams' component={Teams} />
          <Route exact path='/battle' component={Battle} />
          <Route path='/battle/results' component={Results} />
          <Route render={() => {
              return <p>Not Found</p>
            }} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;