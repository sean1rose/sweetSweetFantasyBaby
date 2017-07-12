import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import rbWeeklyTouchesUtil from '../../util/rbWeeklyTouchesUtil';
import Combochart from '../charts/Combo';

class Runningback extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.match.params.name.split('_').join(' '),
      player: rbWeeklyTouchesUtil.getRbAllWeeks(props.match.params.name.split('_').join(' '))
    };
    console.log('in runningback.js - props - ', this.state.name);
    console.log('$final player - ', this.state.player);
  }

  render() {

    if (!this.state.player) {
      return <div>Sorry no Runningback was found</div>
    }

    return (
      <div>
        <Combochart position="rb" player={this.state.player} util={rbWeeklyTouchesUtil} name={this.state.name} />
      </div>
    )
  }
}

export default Runningback;
