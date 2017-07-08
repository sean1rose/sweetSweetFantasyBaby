import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import wrTargetUtil from '../util/wrTargetUtil';
import Combochart from './charts/Combo';
// import SplitButton from 'react-bootstrap/lib/SplitButton';
// import MenuItem from 'react-bootstrap/lib/MenuItem';
import { ButtonToolbar, Button, FormGroup, ControlLabel, FormControl, SplitButton, MenuItem } from 'react-bootstrap';

class Widereceiver extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.match.params.name.split('_').join(' '),
      player: wrTargetUtil.getWrAllWeeks(props.match.params.name.split('_').join(' ')),
      comparison: 'wr1'
    };
    console.log('in runningback.js - props - ', this.state.name);
    console.log('$final player - ', this.state.player);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // console.log('handle change ---> ', this.inputEl.value);
    console.log('2 - e - ', e.target.value);
    switch(e.target.value){
      case '1':
        this.setState({
          comparison: 'wr1'
        });
        break;
      case '2':
        this.setState({
          comparison: 'wr2'
        });
        break;
      case '3':
        this.setState({
          comparison: 'wr3'
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
        <div className="headerContainer">
          <h1>{this.state.name}</h1>
          vs.
            <div className="formHolder">
              <FormControl
                onChange={this.handleChange}
                componentClass="select" 
                >
                <option selected="selected" value="wr1">WR1</option>
                <option value="wr2">WR2</option>
                <option value="wr3">WR3</option>
              </FormControl>
            </div>
        </div>
        <Combochart player={this.state.player} wrTargetUtil={wrTargetUtil} comparison={this.state.comparison}/>
      </div>
    )
  }
}

export default Widereceiver;

/*
    AS A FORMCONTROL ATTRIBUTE ---> inputRef={el => this.inputEl=el }
*/