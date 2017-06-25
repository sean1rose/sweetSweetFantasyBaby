import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AllRunningbacks from './AllRunningbacks';
import Runningback from './Runningback';

const Runningbacks = () => (
  <div>
    <Switch>
      <Route exact path='/runningbacks' component={AllRunningbacks}/>
      <Route path='/runningbacks/:name' component={Runningback}/>
    </Switch>
  </div>
);

export default Runningbacks;