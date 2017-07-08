import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import wrTargetUtil from '../util/wrTargetUtil';
import Combochart from './charts/Combo';

class Widereceiver extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.match.params.name.split('_').join(' '),
      player: wrTargetUtil.getWrAllWeeks(props.match.params.name.split('_').join(' '))
    };
    console.log('in runningback.js - props - ', this.state.name);
    console.log('$final player - ', this.state.player);
  }

  render() {

    if (!this.state.player) {
      return <div>Sorry no widereceiver was found</div>
    }

    return (
      <div>
        <Combochart player={this.state.player} wrTargetUtil={wrTargetUtil} name={this.state.name} />
      </div>
    )
  }
}

export default Widereceiver;
