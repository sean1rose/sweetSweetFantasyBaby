import React, { Component } from 'react';
import PlayerInput from './PlayerInput';
import {Link} from 'react-router-dom';
import getRb2016 from '../util/getRb2016';
import StackedBars from './charts/StackedBars';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';

// HighchartsMore(ReactHighcharts.Highcharts);


console.log('getrbOnes - ', getRb2016.getRbOnes());
console.log('getrbTwos - ', getRb2016.getRbTwos());
console.log('getrbThrees - ', getRb2016.getRbThrees());

// RECAP: https://www.youtube.com/watch?v=z_OpiP_b6HY @ 20:30 
class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneData: {},
      playerTwoData: {},
      displayChart: false,
      config: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.calcHigh = this.calcHigh.bind(this);
    this.calcSecond = this.calcSecond.bind(this);
  }

  /*
  componentDidUpdate() {
    // ['FtPts', 'FtPtsGm', 'Touches', 'TouchesGm', 'FtPtsTouch', 'RushYds', 'CatchYds', 'TotalTd']
    // ['FANTASYPTS', 'FPTSPERGAME', 'TOUCHES', 'TOUCHESPERGAME', 'FANTASYPTSPERTOUCH', 'RYD', 'PYDS', 'TOTALTD']
    // ftptsHigh ends up being 1, we just need to determine who high is
    var ftptsHigh = this.calcHigh(this.state.playerOneData, this.state.playerTwoData, 'FANTASYPTS');
    // second is proportion of high's value
    var ftptsSecond = this.calcSecond(ftptsHigh, this.state.playerOneData, this.state.playerTwoData, 'FANTASYPTS');
    var ftptsgmHigh = this.calcHigh(this.state.playerOneData, this.state.playerTwoData, 'FPTSPERGAME');
    var ftptsgmSecond = this.calcSecond(ftptsgmHigh, this.state.playerOneData, this.state.playerTwoData, 'FPTSPERGAME');
    var touchesHigh = this.calcHigh(this.state.playerOneData, this.state.playerTwoData, 'TOUCHES');
    var touchesSecond = this.calcSecond(touchesHigh, this.state.playerOneData, this.state.playerTwoData, 'TOUCHES');
    var touchesgmHigh = this.calcHigh(this.state.playerOneData, this.state.playerTwoData, 'TOUCHESPERGAME');
    var touchesgmSecond = this.calcSecond(touchesgmHigh, this.state.playerOneData, this.state.playerTwoData, 'TOUCHESPERGAME');
    var ftptstouchHigh = this.calcHigh(this.state.playerOneData, this.state.playerTwoData, 'FANTASYPTSPERTOUCH');
    var ftptstouchSecond = this.calcSecond(ftptstouchHigh, this.state.playerOneData, this.state.playerTwoData, 'FANTASYPTSPERTOUCH');
    var rydHigh = this.calcHigh(this.state.playerOneData, this.state.playerTwoData, 'RYD');
    var rydSecond = this.calcSecond(rydHigh, this.state.playerOneData, this.state.playerTwoData, 'RYD');
    var cydHigh = this.calcHigh(this.state.playerOneData, this.state.playerTwoData, 'PYDS');
    var cydSecond = this.calcSecond(cydHigh, this.state.playerOneData, this.state.playerTwoData, 'PYDS');
    var totalydHigh = this.calcHigh(this.state.playerOneData, this.state.playerTwoData, 'TOTALTD');
    var totalydSecond = this.calcSecond(totalydHigh, this.state.playerOneData, this.state.playerTwoData, 'TOTALTD');

    this.setState(() => {
      var newState = {};
      newState.config = {
        chart: {
          polar: true
        },
        xAxis: {
          categories: ['FtPts', 'FtPtsGm', 'Touches', 'TouchesGm', 'FtPtsTouch', 'RushYds', 'CatchYds', 'TotalTd']
        },
        series: [{
          name: this.state.playerOneData.PLAYER,
          data: [this.state.playerOneData.PLAYER === ftptsHigh ? 1 : ftptsSecond, this.state.playerOneData.PLAYER === ftptsgmHigh ? 1 : ftptsgmSecond, this.state.playerOneData.PLAYER === touchesHigh ? 1 : touchesSecond, this.state.playerOneData.PLAYER === touchesgmHigh ? 1 : touchesgmSecond, this.state.playerOneData.PLAYER === ftptstouchHigh ? 1 : ftptstouchSecond, this.state.playerOneData.PLAYER === rydHigh ? 1 : rydSecond, this.state.playerOneData.PLAYER === cydHigh ? 1 : cydSecond, this.state.playerOneData.PLAYER === totalydHigh ? 1 : totalydSecond],
          pointPlacement: 'on'
        }, {
          name: this.state.playerTwoData.PLAYER,
          data: [this.state.playerOneData.PLAYER === ftptsHigh ? 1 : ftptsSecond, this.state.playerOneData.PLAYER === ftptsgmHigh ? 1 : ftptsgmSecond, this.state.playerOneData.PLAYER === touchesHigh ? 1 : touchesSecond, this.state.playerOneData.PLAYER === touchesgmHigh ? 1 : touchesgmSecond, this.state.playerOneData.PLAYER === ftptstouchHigh ? 1 : ftptstouchSecond, this.state.playerOneData.PLAYER === rydHigh ? 1 : rydSecond, this.state.playerOneData.PLAYER === cydHigh ? 1 : cydSecond, this.state.playerOneData.PLAYER === totalydHigh ? 1 : totalydSecond],
          pointPlacement: 'on'
        }]
      }
      return newState;
    });
    // var config = {
    //   chart: {
    //     polar: true
    //   },
    //   xAxis: {
    //     categories: ['FtPts', 'FtPtsGm', 'Touches', 'TouchesGm', 'FtPtsTouch', 'RushYds', 'CatchYds', 'TotalTd']
    //   },
    //   series: [{
    //     name: this.state.playerOneData.PLAYER,
    //     data: [this.state.playerOneData.PLAYER === ftptsHigh ? 1 : ftptsSecond, this.state.playerOneData.PLAYER === ftptsgmHigh ? 1 : ftptsgmSecond, this.state.playerOneData.PLAYER === touchesHigh ? 1 : touchesSecond, this.state.playerOneData.PLAYER === touchesgmHigh ? 1 : touchesgmSecond, this.state.playerOneData.PLAYER === ftptstouchHigh ? 1 : ftptstouchSecond, this.state.playerOneData.PLAYER === rydHigh ? 1 : rydSecond, this.state.playerOneData.PLAYER === cydHigh ? 1 : cydSecond, this.state.playerOneData.PLAYER === totalydHigh ? 1 : totalydSecond],
    //     pointPlacement: 'on'
    //   }, {
    //     name: this.state.playerTwoData.PLAYER,
    //     data: [this.state.playerOneData.PLAYER === ftptsHigh ? 1 : ftptsSecond, this.state.playerOneData.PLAYER === ftptsgmHigh ? 1 : ftptsgmSecond, this.state.playerOneData.PLAYER === touchesHigh ? 1 : touchesSecond, this.state.playerOneData.PLAYER === touchesgmHigh ? 1 : touchesgmSecond, this.state.playerOneData.PLAYER === ftptstouchHigh ? 1 : ftptstouchSecond, this.state.playerOneData.PLAYER === rydHigh ? 1 : rydSecond, this.state.playerOneData.PLAYER === cydHigh ? 1 : cydSecond, this.state.playerOneData.PLAYER === totalydHigh ? 1 : totalydSecond],
    //     pointPlacement: 'on'
    //   }]
    // }
    
  }
  */

  handleSubmit(id, playername) {
    // have player name -> want a clean search tho...
    var searchedPlayer = getRb2016.get(playername);
    console.log('searched player - ', searchedPlayer);
    var newState = {};
    newState[id + 'Name'] = playername;

    newState[id + 'Data'] = [searchedPlayer[0]][0];
    console.log('newstate - ', newState, id + 'Data' , newState[id + 'Data'], searchedPlayer[0]);

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

        {/*{displayChart && 
          <ReactHighcharts config={this.state.config} />
        }*/}

      </div>
    );
  }
}

export default Battle;