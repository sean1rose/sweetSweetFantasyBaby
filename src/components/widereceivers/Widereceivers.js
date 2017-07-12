import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AllWidereceivers from './AllWidereceivers';
import Widereceiver from './Widereceiver';

const Widereceivers = () => (
  <div>
    <Switch>
      <Route exact path='/widereceivers' component={AllWidereceivers}/>
      <Route path='/widereceivers/:name' component={Widereceiver}/>
    </Switch>
  </div>
);

export default Widereceivers;