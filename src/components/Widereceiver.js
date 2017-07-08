import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import wrTargetUtil from '../util/wrTargetUtil';
import Combochart from './charts/Combo';

class Widereceiver extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.match.params.name.split('_').join(' '),
      player: wrTargetUtil.getWrAllWeeks(props.match.params.name.split('_').join(' ')),
      modifiedComparison: 1
    };
    console.log('in runningback.js - props - ', this.state.name);
    console.log('$final player - ', this.state.player);
    this.handleChildChange = this.handleChildChange.bind(this);
  }

  handleChildChange(e) {
    console.log('PARENT: ', e.target.value);
    switch(e.target.value){
      case 'wr1':
        this.setState({
          modifiedComparison: 1
        });
        break;
      case 'wr2':
        console.log('about to set state to 2 - ');
        this.setState({
          modifiedComparison: 2
        });
        break;
      case 'wr3':
        this.setState({
          modifiedComparison: 3
        });
        break;
    }
  }

  render() {

    if (!this.state.player) {
      return <div>Sorry no widereceiver was found</div>
    }

    return (
      <div>
        <Combochart player={this.state.player} wrTargetUtil={wrTargetUtil} name={this.state.name} onChange={this.handleChildChange} comparison={this.state.modifiedComparison}/>
      </div>
    )
  }
}

export default Widereceiver;
