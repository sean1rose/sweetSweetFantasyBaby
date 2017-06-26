import React from 'react';
import {Link} from 'react-router-dom';
import RbRedzoneUtil from '../util/rbRedzoneUtil';

const Runningback = (props) => {
  console.log('in runningback.js - props - ', props);
  var name = props.match.params.name.split('_').join(' ');
  var player = RbRedzoneUtil.getSingleRb(name);
  console.log('player - ', player);
  console.log('sorted - ', RbRedzoneUtil.allSorted());

  if (!player) {
    return <div>Sorry no runningback was found</div>
  }
  return (
    <div>
      <div >
        <h1>{name}</h1>
      </div>
      {/*<Donutchart teamName={teamName} team={teamPlayersTargetsArray} util={TeamTargetUtil} />*/}
    </div>
  )
};

export default Runningback;