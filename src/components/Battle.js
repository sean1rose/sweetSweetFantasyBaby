import React, { Component } from 'react';
import PlayerInput from './PlayerInput';
import {Link} from 'react-router-dom';
import getRb2016 from '../util/getRb2016';
import Spiderweb from './charts/Spiderweb';

console.log('getrbOnes - ', getRb2016.getRbOnes());
console.log('getrbTwos - ', getRb2016.getRbTwos());
console.log('getrbThrees - ', getRb2016.getRbThrees());
console.log('getRB1AVG - ', getRb2016.getRbOneAvg());
console.log('getRBTwoAVG - ', getRb2016.getRbTwoAvg());
console.log('getRBThreeAVG - ', getRb2016.getRbThreeAvg());

// RECAP: https://www.youtube.com/watch?v=z_OpiP_b6HY @ 20:30 
class Battle extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneData: {},
      playerTwoData: {},
      rbOneAvg: getRb2016.getRbOneAvg(),
      rbTwoAvg: getRb2016.getRbTwoAvg(),
      rbThreeAvg: getRb2016.getRbThreeAvg(),
      displayChart: false,
      config: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.calcHigh = this.calcHigh.bind(this);
    this.calcSecond = this.calcSecond.bind(this);
  }

  handleSubmit(id, playername) {
    // have player name -> want a clean search tho...
    var searchedPlayer = getRb2016.get(playername);
    console.log('searched player - ', searchedPlayer);
    var newState = {};
    newState[id + 'Name'] = playername;

    newState[id + 'Data'] = [searchedPlayer[0]][0];
    // console.log('newstate - ', newState, id + 'Data' , newState[id + 'Data'], searchedPlayer[0]);

    this.setState((prevState, props) => {
      if (prevState.playerOneName || prevState.playerTwoName){
        // don't want to reroute to schedule -> WANT TO DISPLAY APPROPRIATE CHARTS
        newState['displayChart'] = true;
        return newState;
        // return this.props.history.push('/schedule');
      } 
      else {
        return newState;
      }
    });
  }

  calcHigh(p1Data, p2Data, attribute) {
    return p1Data[attribute] > p2Data[attribute] ? p1Data.PLAYER : p2Data.PLAYER;
  }

  calcSecond(high, p1Data, p2Data, attribute) {
    return high === p1Data.PLAYER ? (p2Data[attribute] / p1Data[attribute]) : (p1Data[attribute] / p2Data[attribute]);
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
          <Spiderweb playerOneData={this.state.playerOneData} playerTwoData={this.state.playerTwoData} rbOneAvg={this.state.rbOneAvg} rbTwoAvg={this.state.rbTwoAvg} rbThreeAvg={this.state.rbThreeAvg} />
        }


      </div>
    );
  }
}

export default Battle;