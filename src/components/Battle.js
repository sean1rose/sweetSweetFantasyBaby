import React, { Component } from 'react';
import PlayerInput from './PlayerInput';
import {Link} from 'react-router-dom';
import getRb2016 from '../util/getRb2016';
import StackedBars from './charts/StackedBars';

console.log('getrb - ', getRb2016);

// RECAP: https://www.youtube.com/watch?v=z_OpiP_b6HY @ 20:30 
class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneData: {},
      playerTwoData: {},
      displayChart: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, playername) {
    // have player name -> want a clean search tho...
    var searchedPlayer = getRb2016.get(playername);
    console.log('searched player - ', searchedPlayer);
    var newState = {};
    newState[id + 'Name'] = playername;

    newState[id + 'Data'] = [searchedPlayer[0]];
    // console.log('newstate - ', newState, id + 'Data' , newState[id + 'Data'], searchedPlayer[0]);

    this.setState((prevState, props) => {
      if (prevState.playerOneName || prevState.playerTwoName){
        // don't want to reroute to schedule -> WANT TO DISPLAY APPROPRIATE CHARTS
        newState['displayChart'] = true;
        return newState;
        // return this.props.history.push('/schedule');
      } 
      else {
        console.log('this.state - ', this.state);
        return newState;
      }
    });
  }
  
  render() {
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneData = this.state.playerOneData;
    var playerTwoData = this.state.playerTwoData;
    var displayChart = this.state.displayChart;
    return (
      <div>
        <div className='row'>
          {!playerOneName && 
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit} />}

          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit} />}

        </div>

        {displayChart && 
        <StackedBars playerOne={playerOneData} playerTwo={playerTwoData} />}

      </div>
    );
  }
}

export default Battle;