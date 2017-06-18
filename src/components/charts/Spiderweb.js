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
    // this.calcHigh = this.calcHigh.bind(this);
    // this.calcSecond = this.calcSecond.bind(this);
    this.calcHighFromFive = this.calcHighFromFive.bind(this);
    this.calcProportion = this.calcProportion.bind(this);
    var self = this;

    // ['FANTASYPTS', 'FPTSPERGAME', 'TDPERTOUCH', 'TOUCHESPERGAME', 'FANTASYPTSPERTOUCH', 'RYD', 'PYDS', 'TOTALTD']    
    
    /*
    // ftptsHigh ends up being 1, we just need to determine who high is
    var ftptsHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'FANTASYPTS');
    // second is proportion of high's value
    var ftptsSecond = this.calcSecond(ftptsHigh, this.props.playerOneData, this.props.playerTwoData, 'FANTASYPTS');
    // var ftptsThird = this.calcThird()
    var ftptsPlayerOne = this.props.playerOneData.FANTASYPTS;
    var ftptsPlayerTwo = this.props.playerTwoData.FANTASYPTS;
    */

    var playerOne = this.props.playerOneData;
    var playerTwo = this.props.playerTwoData;
    var rbOneAvg = this.props.rbOneAvg;
    var rbTwoAvg = this.props.rbTwoAvg;
    var rbThreeAvg = this.props.rbThreeAvg;

    // 1
    var ftptsFirstObj = this.calcHighFromFive('FANTASYPTS', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[0];
    var ftptsSecondObj = this.calcHighFromFive('FANTASYPTS', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[1];
    var ftptsThirdObj = this.calcHighFromFive('FANTASYPTS', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[2];
    // second and third proportion of high's value
    var ftptsSecondProportion = this.calcProportion(ftptsFirstObj, ftptsSecondObj, 'FANTASYPTS');
    var ftptsThirdProportion = this.calcProportion(ftptsFirstObj, ftptsThirdObj, 'FANTASYPTS');
    

    // var ftptsgmHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'FPTSPERGAME');
    // var ftptsgmSecond = this.calcSecond(ftptsgmHigh, this.props.playerOneData, this.props.playerTwoData, 'FPTSPERGAME');
    // var ftptsgmPlayerOne = this.props.playerOneData.FPTSPERGAME;
    // var ftptsgmPlayerTwo = this.props.playerTwoData.FPTSPERGAME;

    // 2
    var ftptsgmFirstObj = this.calcHighFromFive('FPTSPERGAME', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[0];
    var ftptsgmSecondObj = this.calcHighFromFive('FPTSPERGAME', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[1];
    var ftptsgmThirdObj = this.calcHighFromFive('FPTSPERGAME', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[2];
    var ftptsgmSecondProportion = this.calcProportion(ftptsgmFirstObj, ftptsgmSecondObj, 'FPTSPERGAME');
    var ftptsgmThirdProportion = this.calcProportion(ftptsgmFirstObj, ftptsgmThirdObj, 'FPTSPERGAME');
    

    // var tdpertouchHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'TDPERTOUCH');
    // var tdpertouchSecond = this.calcSecond(tdpertouchHigh, this.props.playerOneData, this.props.playerTwoData, 'TDPERTOUCH');
    // var tdpertouchPlayerOne = this.props.playerOneData.TDPERTOUCH;
    // var tdpertouchPlayerTwo = this.props.playerTwoData.TDPERTOUCH;

    // 3
    var tdpertouchFirstObj = this.calcHighFromFive('TDPERTOUCH', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[0];
    var tdpertouchSecondObj = this.calcHighFromFive('TDPERTOUCH', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[1];
    var tdpertouchThirdObj = this.calcHighFromFive('TDPERTOUCH', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[2];
    var tdpertouchSecondProportion = this.calcProportion(tdpertouchFirstObj, tdpertouchSecondObj, 'TDPERTOUCH');
    var tdpertouchThirdProportion = this.calcProportion(tdpertouchFirstObj, tdpertouchThirdObj, 'TDPERTOUCH');


    // var touchesgmHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'TOUCHESPERGAME');
    // var touchesgmSecond = this.calcSecond(touchesgmHigh, this.props.playerOneData, this.props.playerTwoData, 'TOUCHESPERGAME');
    // var touchesgmPlayerOne = this.props.playerOneData.TOUCHESPERGAME;
    // var touchesgmPlayerTwo = this.props.playerTwoData.TOUCHESPERGAME;

    // 4
    var touchesgmFirstObj = this.calcHighFromFive('TOUCHESPERGAME', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[0];
    var touchesgmSecondObj = this.calcHighFromFive('TOUCHESPERGAME', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[1];
    var touchesgmThirdObj = this.calcHighFromFive('TOUCHESPERGAME', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[2];
    var touchesgmSecondProportion = this.calcProportion(touchesgmFirstObj, touchesgmSecondObj, 'TOUCHESPERGAME');
    var touchesgmThirdProportion = this.calcProportion(touchesgmFirstObj, touchesgmThirdObj, 'TOUCHESPERGAME');


    // var ftptstouchHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'FANTASYPTSPERTOUCH');
    // var ftptstouchSecond = this.calcSecond(ftptstouchHigh, this.props.playerOneData, this.props.playerTwoData, 'FANTASYPTSPERTOUCH');
    // var ftptstouchPlayerOne = this.props.playerOneData.FANTASYPTSPERTOUCH;
    // var ftptstouchPlayerTwo = this.props.playerTwoData.FANTASYPTSPERTOUCH;

    // 5
    var ftptstouchFirstObj = this.calcHighFromFive('FANTASYPTSPERTOUCH', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[0];
    var ftptstouchSecondObj = this.calcHighFromFive('FANTASYPTSPERTOUCH', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[1];
    var ftptstouchThirdObj = this.calcHighFromFive('FANTASYPTSPERTOUCH', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[2];
    var ftptstouchSecondProportion = this.calcProportion(ftptstouchFirstObj, ftptstouchSecondObj, 'FANTASYPTSPERTOUCH');
    var ftptstouchThirdProportion = this.calcProportion(ftptstouchFirstObj, ftptstouchThirdObj, 'FANTASYPTSPERTOUCH');


    // var rydHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'RYD');
    // var rydSecond = this.calcSecond(rydHigh, this.props.playerOneData, this.props.playerTwoData, 'RYD');
    // var rydPlayerOne = this.props.playerOneData.RYD;
    // var rydPlayerTwo = this.props.playerTwoData.RYD;

    // 6
    var rydFirstObj = this.calcHighFromFive('RYD', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[0];
    var rydSecondObj = this.calcHighFromFive('RYD', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[1];
    var rydThirdObj = this.calcHighFromFive('RYD', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[2];
    var rydSecondProportion = this.calcProportion(rydFirstObj, rydSecondObj, 'FANTASYPTSPERTOUCH');
    var rydThirdProportion = this.calcProportion(rydFirstObj, rydThirdObj, 'FANTASYPTSPERTOUCH');


    // var cydHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'PYDS');
    // var cydSecond = this.calcSecond(cydHigh, this.props.playerOneData, this.props.playerTwoData, 'PYDS');
    // var cydPlayerOne = this.props.playerOneData.PYDS;
    // var cydPlayerTwo = this.props.playerTwoData.PYDS;

    // 7
    var cydFirstObj = this.calcHighFromFive('PYDS', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[0];
    var cydSecondObj = this.calcHighFromFive('PYDS', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[1];
    var cydThirdObj = this.calcHighFromFive('PYDS', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[2];
    var cydSecondProportion = this.calcProportion(cydFirstObj, cydSecondObj, 'PYDS');
    var cydThirdProportion = this.calcProportion(cydFirstObj, cydThirdObj, 'PYDS');

    
    // var totaltdHigh = this.calcHigh(this.props.playerOneData, this.props.playerTwoData, 'TOTALTD');
    // var totaltdSecond = this.calcSecond(totaltdHigh, this.props.playerOneData, this.props.playerTwoData, 'TOTALTD');
    // var totaltdPlayerOne = this.props.playerOneData.TOTALTD;
    // var totaltdPlayerTwo = this.props.playerTwoData.TOTALTD;

    // 8
    var totaltdFirstObj = this.calcHighFromFive('TOTALTD', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[0];
    var totaltdSecondObj = this.calcHighFromFive('TOTALTD', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[1];
    var totaltdThirdObj = this.calcHighFromFive('TOTALTD', [playerOne, playerTwo, rbOneAvg, rbTwoAvg, rbThreeAvg])[2];
    var totaltdSecondProportion = this.calcProportion(totaltdFirstObj, totaltdSecondObj, 'TOTALTD');
    var totaltdThirdProportion = this.calcProportion(totaltdFirstObj, totaltdSecondObj, 'TOTALTD');


    this.state = {
      finalStatMapping: ['Fantasy Pts', 'Fantasy Pts Per Game', 'TD PER TOUCH RATE', 'Touches Per Game', 'Fantasy Pts Per Touch', 'Rush Yards', 'Catch Yards', 'Total Touchdowns'],
      config: {
        chart: {
          polar: true,
          type: 'line'
        },
        title: {
          text: this.props.playerOneData.PLAYER + ' vs ' + this.props.playerTwoData.PLAYER + ' vs ' + this.props.rbOneAvg.PLAYER,
          margin: 30
        },
        legend: {
          margin: 30
        },
        pane: {
          size: '100%'
        },
        xAxis: {
          categories: ['FANTASYPTS', 'FPTSPERGAME', 'TDPERTOUCH', 'TOUCHESPERGAME', 'FANTASYPTSPERTOUCH', 'RYD', 'PYDS', 'TOTALTD'],
          tickPlacement: 'on',
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        },
        tooltip: {
          shared: true,
          formatter: function(z){
            var s;
            // ['FANTASYPTS', 'FPTSPERGAME', 'TDPERTOUCH', 'TOUCHESPERGAME', 'FANTASYPTSPERTOUCH', 'RYD', 'PYDS', 'TOTALTD']
            self.state.config.xAxis.categories.forEach((element, index) => {
                // loop thru the 8 categories, when it/element matches this.x..
              if (element == this.x){
                // console.log('self - ', self);
                // s = '<b>' + element + '</b>';
                s = '<b>' + self.state.finalStatMapping[index] + '</b>';
                var playerOneName = self.props.playerOneData.PLAYER
                var playerTwoName = self.props.playerTwoData.PLAYER;
                var playerThreeName = self.props.rbOneAvg.PLAYER;

                if (element == 'TDPERTOUCH'){
                  console.log('TD PER TOUCH! - ', self.props.playerOneData[element], self.props.playerTwoData[element], self.props.rbOneAvg[element])
                  var playerOneStat = self.props.playerOneData[element] + '%';
                  var playerTwoStat = self.props.playerTwoData[element] + '%';
                  var playerThreeStat = self.props.rbOneAvg[element] + '%';
                } else {
                  var playerOneStat = Math.round(self.props.playerOneData[element] * 100) / 100;
                  var playerTwoStat = Math.round(self.props.playerTwoData[element] * 100) / 100;
                  var playerThreeStat = Math.round(self.props.rbOneAvg[element] * 100) / 100;
                }

                s += '<br/>' + playerOneName + ': ' + playerOneStat;
                s += '<br/>' + playerTwoName + ': ' + playerTwoStat;
                s += '<br/>' + playerThreeName + ': ' + playerThreeStat;
              }
            });
            return s;
          }
        },
        series: [{

          name: playerOne.PLAYER,
          data: [
            playerOne.PLAYER === ftptsFirstObj.PLAYER ? 1 : playerOne.PLAYER === ftptsSecondObj.PLAYER ? ftptsSecondProportion : ftptsThirdProportion,
            playerOne.PLAYER === ftptsgmFirstObj.PLAYER ? 1 : playerOne.PLAYER === ftptsgmSecondObj.PLAYER ? ftptsgmSecondProportion : ftptsThirdProportion,
            playerOne.PLAYER === tdpertouchFirstObj.PLAYER ? 1 : playerOne.PLAYER === tdpertouchSecondObj.PLAYER ? tdpertouchSecondProportion : tdpertouchThirdProportion,
            playerOne.PLAYER === touchesgmFirstObj.PLAYER ? 1 : playerOne.PLAYER === touchesgmSecondObj.PLAYER ? touchesgmSecondProportion : touchesgmThirdProportion,
            playerOne.PLAYER === ftptstouchFirstObj.PLAYER ? 1 : playerOne.PLAYER === ftptstouchSecondObj.PLAYER ? ftptstouchSecondProportion : ftptstouchThirdProportion,
            playerOne.PLAYER === rydFirstObj.PLAYER ? 1 : playerOne.PLAYER === rydSecondObj.PLAYER ? rydSecondProportion : rydThirdProportion,
            playerOne.PLAYER === cydFirstObj.PLAYER ? 1 : playerOne.PLAYER === cydSecondObj.PLAYER ? cydSecondProportion : cydThirdProportion,
            playerOne.PLAYER === totaltdFirstObj.PLAYER ? 1 : playerOne.PLAYER === totaltdSecondObj.PLAYER ? totaltdSecondProportion : totaltdThirdProportion
            ],
          // for data ^ for each category, need to figure out if player one is 1st, 2nd or third
            // if 1st -> 1
            // if 2nd or 3d -> give the value (proportion);

          // name: this.props.playerOneData.PLAYER,
          // name: ftptsFirstObj.PLAYER,
          // data: [this.props.playerOneData.PLAYER === ftptsHigh ? 1 : ftptsSecond, this.props.playerOneData.PLAYER === ftptsgmHigh ? 1 : ftptsgmSecond, this.props.playerOneData.PLAYER === tdpertouchHigh ? 1 : tdpertouchSecond, this.props.playerOneData.PLAYER === touchesgmHigh ? 1 : touchesgmSecond, this.props.playerOneData.PLAYER === ftptstouchHigh ? 1 : ftptstouchSecond, this.props.playerOneData.PLAYER === rydHigh ? 1 : rydSecond, this.props.playerOneData.PLAYER === cydHigh ? 1 : cydSecond, this.props.playerOneData.PLAYER === totaltdHigh ? 1 : totaltdSecond],
          // data: [1,1,1,1,1,1,1,1],
          pointPlacement: 'on'
        }, {
          // name: this.props.playerTwoData.PLAYER,
          // data: [this.props.playerTwoData.PLAYER === ftptsHigh ? 1 : ftptsSecond, this.props.playerTwoData.PLAYER === ftptsgmHigh ? 1 : ftptsgmSecond, this.props.playerTwoData.PLAYER === tdpertouchHigh ? 1 : tdpertouchSecond, this.props.playerTwoData.PLAYER === touchesgmHigh ? 1 : touchesgmSecond, this.props.playerTwoData.PLAYER === ftptstouchHigh ? 1 : ftptstouchSecond, this.props.playerTwoData.PLAYER === rydHigh ? 1 : rydSecond, this.props.playerTwoData.PLAYER === cydHigh ? 1 : cydSecond, this.props.playerTwoData.PLAYER === totaltdHigh ? 1 : totaltdSecond],
          // name: ftptsSecondObj.PLAYER,
          name: playerTwo.PLAYER,
          data: [
            playerTwo.PLAYER === ftptsFirstObj.PLAYER ? 1 : playerTwo.PLAYER === ftptsSecondObj.PLAYER ? ftptsSecondProportion : ftptsThirdProportion,
            playerTwo.PLAYER === ftptsgmFirstObj.PLAYER ? 1 : playerTwo.PLAYER === ftptsgmSecondObj.PLAYER ? ftptsgmSecondProportion : ftptsThirdProportion,
            playerTwo.PLAYER === tdpertouchFirstObj.PLAYER ? 1 : playerTwo.PLAYER === tdpertouchSecondObj.PLAYER ? tdpertouchSecondProportion : tdpertouchThirdProportion,
            playerTwo.PLAYER === touchesgmFirstObj.PLAYER ? 1 : playerTwo.PLAYER === touchesgmSecondObj.PLAYER ? touchesgmSecondProportion : touchesgmThirdProportion,
            playerTwo.PLAYER === ftptstouchFirstObj.PLAYER ? 1 : playerTwo.PLAYER === ftptstouchSecondObj.PLAYER ? ftptstouchSecondProportion : ftptstouchThirdProportion,
            playerTwo.PLAYER === rydFirstObj.PLAYER ? 1 : playerTwo.PLAYER === rydSecondObj.PLAYER ? rydSecondProportion : rydThirdProportion,
            playerTwo.PLAYER === cydFirstObj.PLAYER ? 1 : playerTwo.PLAYER === cydSecondObj.PLAYER ? cydSecondProportion : cydThirdProportion,
            playerTwo.PLAYER === totaltdFirstObj.PLAYER ? 1 : playerTwo.PLAYER === totaltdSecondObj.PLAYER ? totaltdSecondProportion : totaltdThirdProportion            
          ],
          pointPlacement: 'on'
        }, {
          // name: this.props.rbOneAvg.PLAYER,
          // name: ftptsThirdObj.PLAYER,
          name: rbOneAvg.PLAYER,
          // data: [ftptsThirdProportion, ftptsgmThirdProportion, tdpertouchThirdProportion, touchesgmThirdProportion, ftptstouchThirdProportion, rydThirdProportion, cydThirdProportion, totaltdThirdProportion],
          data: [
            rbOneAvg.PLAYER === ftptsFirstObj.PLAYER ? 1 : rbOneAvg.PLAYER === ftptsSecondObj.PLAYER ? ftptsSecondProportion : ftptsThirdProportion,
            rbOneAvg.PLAYER === ftptsgmFirstObj.PLAYER ? 1 : rbOneAvg.PLAYER === ftptsgmSecondObj.PLAYER ? ftptsgmSecondProportion : ftptsThirdProportion,
            rbOneAvg.PLAYER === tdpertouchFirstObj.PLAYER ? 1 : rbOneAvg.PLAYER === tdpertouchSecondObj.PLAYER ? tdpertouchSecondProportion : tdpertouchThirdProportion,
            rbOneAvg.PLAYER === touchesgmFirstObj.PLAYER ? 1 : rbOneAvg.PLAYER === touchesgmSecondObj.PLAYER ? touchesgmSecondProportion : touchesgmThirdProportion,
            rbOneAvg.PLAYER === ftptstouchFirstObj.PLAYER ? 1 : rbOneAvg.PLAYER === ftptstouchSecondObj.PLAYER ? ftptstouchSecondProportion : ftptstouchThirdProportion,
            rbOneAvg.PLAYER === rydFirstObj.PLAYER ? 1 : rbOneAvg.PLAYER === rydSecondObj.PLAYER ? rydSecondProportion : rydThirdProportion,
            rbOneAvg.PLAYER === cydFirstObj.PLAYER ? 1 : rbOneAvg.PLAYER === cydSecondObj.PLAYER ? cydSecondProportion : cydThirdProportion,
            rbOneAvg.PLAYER === totaltdFirstObj.PLAYER ? 1 : rbOneAvg.PLAYER === totaltdSecondObj.PLAYER ? totaltdSecondProportion : totaltdThirdProportion                        
          ],
          pointPlacement: 'on'
        }]
      }
    }
  }
  // https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting

  // calcHigh(p1Data, p2Data, attribute) {
  //   return p1Data[attribute] > p2Data[attribute] ? p1Data.PLAYER : p2Data.PLAYER;
  // }

  // calcSecond(high, p1Data, p2Data, attribute) {
  //   return high === p1Data.PLAYER ? (p2Data[attribute] / p1Data[attribute]) : (p1Data[attribute] / p2Data[attribute]);
  // }

  calcHighFromFive(attribute, list) {
    // this organizes 1st to 5th
    return list.sort((a,b) => { return b[attribute] - a[attribute] });
  }

  calcProportion(high, p2Data, attribute) {
    return (p2Data[attribute] / high[attribute])
    // return high === p1Data.PLAYER ? (p2Data[attribute] / p1Data[attribute]) : (p1Data[attribute] / p2Data[attribute]);
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