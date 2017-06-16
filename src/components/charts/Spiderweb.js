import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import HighchartsExporting from 'highcharts-exporting';
HighchartsMore(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);



class Spiderweb extends Component {
  constructor(props){
    console.log('props - ', props);
    super(props);
    this.calcHigh = this.calcHigh.bind(this);
    this.calcSecond = this.calcSecond.bind(this);

    // ['FtPts', 'FtPtsGm', 'Touches', 'TouchesGm', 'FtPtsTouch', 'RushYds', 'CatchYds', 'TotalTd']
    // ['FANTASYPTS', 'FPTSPERGAME', 'TOUCHES', 'TOUCHESPERGAME', 'FANTASYPTSPERTOUCH', 'RYD', 'PYDS', 'TOTALTD']
    // ftptsHigh ends up being 1, we just need to determine who high is
    var ftptsHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'FANTASYPTS');
    // second is proportion of high's value
    var ftptsSecond = this.calcSecond(ftptsHigh, this.props.playerOneData, this.props.playerTwoData, 'FANTASYPTS');
    var ftptsgmHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'FPTSPERGAME');
    var ftptsgmSecond = this.calcSecond(ftptsgmHigh, this.props.playerOneData, this.props.playerTwoData, 'FPTSPERGAME');
    var touchesHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'TOUCHES');
    var touchesSecond = this.calcSecond(touchesHigh, this.props.playerOneData, this.props.playerTwoData, 'TOUCHES');
    var touchesgmHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'TOUCHESPERGAME');
    var touchesgmSecond = this.calcSecond(touchesgmHigh, this.props.playerOneData, this.props.playerTwoData, 'TOUCHESPERGAME');
    var ftptstouchHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'FANTASYPTSPERTOUCH');
    var ftptstouchSecond = this.calcSecond(ftptstouchHigh, this.props.playerOneData, this.props.playerTwoData, 'FANTASYPTSPERTOUCH');
    var rydHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'RYD');
    var rydSecond = this.calcSecond(rydHigh, this.props.playerOneData, this.props.playerTwoData, 'RYD');
    var cydHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'PYDS');
    var cydSecond = this.calcSecond(cydHigh, this.props.playerOneData, this.props.playerTwoData, 'PYDS');
    var totalydHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'TOTALTD');
    var totalydSecond = this.calcSecond(totalydHigh, this.props.playerOneData, this.props.playerTwoData, 'TOTALTD');

    console.log('1 - ', [this.props.playerOneData.PLAYER === ftptsHigh ? 1 : ftptsSecond, this.props.playerOneData.PLAYER === ftptsgmHigh ? 1 : ftptsgmSecond, this.props.playerOneData.PLAYER === touchesHigh ? 1 : touchesSecond, this.props.playerOneData.PLAYER === touchesgmHigh ? 1 : touchesgmSecond, this.props.playerOneData.PLAYER === ftptstouchHigh ? 1 : ftptstouchSecond, this.props.playerOneData.PLAYER === rydHigh ? 1 : rydSecond, this.props.playerOneData.PLAYER === cydHigh ? 1 : cydSecond, this.props.playerOneData.PLAYER === totalydHigh ? 1 : totalydSecond]);

    this.state = {
      config: {
        chart: {
          polar: true,
          type: 'line'
        },
        title: {
          text: this.props.playerOneData.PLAYER + ' vs ' + this.props.playerTwoData.PLAYER
        },
        xAxis: {
          categories: ['FtPts', 'FtPtsGm', 'Touches', 'TouchesGm', 'FtPtsTouch', 'RushYds', 'CatchYds', 'TotalTd'],
          tickPlacement: 'on',
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        },
        series: [{
          name: this.props.playerOneData.PLAYER,
          data: [this.props.playerOneData.PLAYER === ftptsHigh ? 1 : ftptsSecond, this.props.playerOneData.PLAYER === ftptsgmHigh ? 1 : ftptsgmSecond, this.props.playerOneData.PLAYER === touchesHigh ? 1 : touchesSecond, this.props.playerOneData.PLAYER === touchesgmHigh ? 1 : touchesgmSecond, this.props.playerOneData.PLAYER === ftptstouchHigh ? 1 : ftptstouchSecond, this.props.playerOneData.PLAYER === rydHigh ? 1 : rydSecond, this.props.playerOneData.PLAYER === cydHigh ? 1 : cydSecond, this.props.playerOneData.PLAYER === totalydHigh ? 1 : totalydSecond],
          pointPlacement: 'on'
        }, {
          name: this.props.playerTwoData.PLAYER,
          data: [this.props.playerTwoData.PLAYER === ftptsHigh ? 1 : ftptsSecond, this.props.playerTwoData.PLAYER === ftptsgmHigh ? 1 : ftptsgmSecond, this.props.playerTwoData.PLAYER === touchesHigh ? 1 : touchesSecond, this.props.playerTwoData.PLAYER === touchesgmHigh ? 1 : touchesgmSecond, this.props.playerTwoData.PLAYER === ftptstouchHigh ? 1 : ftptstouchSecond, this.props.playerTwoData.PLAYER === rydHigh ? 1 : rydSecond, this.props.playerTwoData.PLAYER === cydHigh ? 1 : cydSecond, this.props.playerTwoData.PLAYER === totalydHigh ? 1 : totalydSecond],
          pointPlacement: 'on'
        }]
      }
    }
  }

  calcHigh(p1Data, p2Data, attribute) {
    return p1Data[attribute] > p2Data[attribute] ? p1Data.PLAYER : p2Data.PLAYER;
  }

  calcSecond(high, p1Data, p2Data, attribute) {
    return high === p1Data.PLAYER ? (p2Data[attribute] / p1Data[attribute]) : (p1Data[attribute] / p2Data[attribute]);
  }

  render() {
    // var mydata = parsed;
    console.log('this. props - ', this.props);
    return (
      <div>
        <ReactHighcharts config={this.state.config} ref="chart" />
      </div>
    )
  }
}

export default Spiderweb;