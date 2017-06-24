import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import HighchartsExporting from 'highcharts-exporting';
HighchartsMore(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);

class Spiderweb extends Component {
  constructor(props){
    // console.log('props - ', props);
    super(props);
    this.calcHighFromList = this.calcHighFromList.bind(this);
    this.calcProportion = this.calcProportion.bind(this);
    var self = this;
    // ['FANTASYPTS', 'FPTSPERGAME', 'TDPERTOUCH', 'TOUCHESPERGAME', 'FANTASYPTSPERTOUCH', 'RYD', 'PYDS', 'TOTALTD']    
    var playerOne = this.props.playerOneData;
    var playerTwo = this.props.playerTwoData;
    var rbOneAvg = this.props.rbOneAvg;
    var rbTwoAvg = this.props.rbTwoAvg;
    var rbThreeAvg = this.props.rbThreeAvg;

    // 1
    var ftptsFirstObj = this.calcHighFromList('FANTASYPTS', [playerOne, playerTwo, rbOneAvg])[0];
    var ftptsSecondObj = this.calcHighFromList('FANTASYPTS', [playerOne, playerTwo, rbOneAvg])[1];
    var ftptsThirdObj = this.calcHighFromList('FANTASYPTS', [playerOne, playerTwo, rbOneAvg])[2];
    // second and third proportion of high's value
    var ftptsSecondProportion = this.calcProportion(ftptsFirstObj, ftptsSecondObj, 'FANTASYPTS');
    var ftptsThirdProportion = this.calcProportion(ftptsFirstObj, ftptsThirdObj, 'FANTASYPTS');


    // 2
    var ftptsgmFirstObj = this.calcHighFromList('FPTSPERGAME', [playerOne, playerTwo, rbOneAvg])[0];
    var ftptsgmSecondObj = this.calcHighFromList('FPTSPERGAME', [playerOne, playerTwo, rbOneAvg])[1];
    var ftptsgmThirdObj = this.calcHighFromList('FPTSPERGAME', [playerOne, playerTwo, rbOneAvg])[2];
    var ftptsgmSecondProportion = this.calcProportion(ftptsgmFirstObj, ftptsgmSecondObj, 'FPTSPERGAME');
    var ftptsgmThirdProportion = this.calcProportion(ftptsgmFirstObj, ftptsgmThirdObj, 'FPTSPERGAME');

    // 3
    var tdpertouchFirstObj = this.calcHighFromList('TDPERTOUCH', [playerOne, playerTwo, rbOneAvg])[0];
    var tdpertouchSecondObj = this.calcHighFromList('TDPERTOUCH', [playerOne, playerTwo, rbOneAvg])[1];
    var tdpertouchThirdObj = this.calcHighFromList('TDPERTOUCH', [playerOne, playerTwo, rbOneAvg])[2];
    var tdpertouchSecondProportion = this.calcProportion(tdpertouchFirstObj, tdpertouchSecondObj, 'TDPERTOUCH');
    var tdpertouchThirdProportion = this.calcProportion(tdpertouchFirstObj, tdpertouchThirdObj, 'TDPERTOUCH');

    // 4
    var touchesgmFirstObj = this.calcHighFromList('TOUCHESPERGAME', [playerOne, playerTwo, rbOneAvg])[0];
    var touchesgmSecondObj = this.calcHighFromList('TOUCHESPERGAME', [playerOne, playerTwo, rbOneAvg])[1];
    var touchesgmThirdObj = this.calcHighFromList('TOUCHESPERGAME', [playerOne, playerTwo, rbOneAvg])[2];
    var touchesgmSecondProportion = this.calcProportion(touchesgmFirstObj, touchesgmSecondObj, 'TOUCHESPERGAME');
    var touchesgmThirdProportion = this.calcProportion(touchesgmFirstObj, touchesgmThirdObj, 'TOUCHESPERGAME');

    // 5
    var ftptstouchFirstObj = this.calcHighFromList('FANTASYPTSPERTOUCH', [playerOne, playerTwo, rbOneAvg])[0];
    var ftptstouchSecondObj = this.calcHighFromList('FANTASYPTSPERTOUCH', [playerOne, playerTwo, rbOneAvg])[1];
    var ftptstouchThirdObj = this.calcHighFromList('FANTASYPTSPERTOUCH', [playerOne, playerTwo, rbOneAvg])[2];
    var ftptstouchSecondProportion = this.calcProportion(ftptstouchFirstObj, ftptstouchSecondObj, 'FANTASYPTSPERTOUCH');
    var ftptstouchThirdProportion = this.calcProportion(ftptstouchFirstObj, ftptstouchThirdObj, 'FANTASYPTSPERTOUCH');

    // 6
    var rydFirstObj = this.calcHighFromList('RYD', [playerOne, playerTwo, rbOneAvg])[0];
    var rydSecondObj = this.calcHighFromList('RYD', [playerOne, playerTwo, rbOneAvg])[1];
    var rydThirdObj = this.calcHighFromList('RYD', [playerOne, playerTwo, rbOneAvg])[2];
    var rydSecondProportion = this.calcProportion(rydFirstObj, rydSecondObj, 'RYD');
    var rydThirdProportion = this.calcProportion(rydFirstObj, rydThirdObj, 'RYD');

    // 7
    var cydFirstObj = this.calcHighFromList('PYDS', [playerOne, playerTwo, rbOneAvg])[0];
    var cydSecondObj = this.calcHighFromList('PYDS', [playerOne, playerTwo, rbOneAvg])[1];
    var cydThirdObj = this.calcHighFromList('PYDS', [playerOne, playerTwo, rbOneAvg])[2];
    var cydSecondProportion = this.calcProportion(cydFirstObj, cydSecondObj, 'PYDS');
    var cydThirdProportion = this.calcProportion(cydFirstObj, cydThirdObj, 'PYDS');

    // 8
    var totaltdFirstObj = this.calcHighFromList('TOTALTD', [playerOne, playerTwo, rbOneAvg])[0];
    var totaltdSecondObj = this.calcHighFromList('TOTALTD', [playerOne, playerTwo, rbOneAvg])[1];
    var totaltdThirdObj = this.calcHighFromList('TOTALTD', [playerOne, playerTwo, rbOneAvg])[2];
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
          pointPlacement: 'on'
        }, {
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
          name: rbOneAvg.PLAYER,
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

  calcHighFromList(attribute, list) {
    // this organizes 1st to 5th
    return list.sort((a,b) => { return b[attribute] - a[attribute] });
  }

  calcProportion(high, p2Data, attribute) {
    return (p2Data[attribute] / high[attribute])
  }


  render() {
    // var mydata = parsed;
    console.log('this. props - ', this.props);
    return (
      <div>
        <ReactHighcharts config={this.state.config}  />
      </div>
    )
  }
}

export default Spiderweb;