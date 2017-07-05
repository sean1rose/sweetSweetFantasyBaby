import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';


class Barchart extends Component {
  constructor(props){
    super(props);
    // console.log('getTopRbInCategory!!!! - ', props.redzoneUtil.getTopRbInCategory(`Rush_Rz_In_${props.marker}_Car`));
    var rb101 = props.redzoneUtil.getTopRbInCategory(`Rush_Rz_In_${props.marker}_Car`);

    var rb1AvgForTd = props.redzoneUtil.getRbAvgForCategory(`Rush_Rz_In_${props.marker}_Td`, 1, props.marker);
    var rb1AvgForCar = props.redzoneUtil.getRbAvgForCategory(`Rush_Rz_In_${props.marker}_Car`, 1, props.marker);
    var rb1AvgForTeamCar = props.redzoneUtil.getRbAvgForCategory(`Rush_Rz_In_${props.marker}`, 1, props.marker);
    var rb1AvgForTeamRzOpp = props.redzoneUtil.getRbAvgForCategory(`Rz_Opp_In_${props.marker}`, 1, props.marker);

    var rb2AvgForTd = props.redzoneUtil.getRbAvgForCategory(`Rush_Rz_In_${props.marker}_Td`, 2, props.marker);
    var rb2AvgForCar = props.redzoneUtil.getRbAvgForCategory(`Rush_Rz_In_${props.marker}_Car`, 2, props.marker);
    var rb2AvgForTeamCar = props.redzoneUtil.getRbAvgForCategory(`Rush_Rz_In_${props.marker}`, 2, props.marker);
    var rb2AvgForTeamRzOpp = props.redzoneUtil.getRbAvgForCategory(`Rz_Opp_In_${props.marker}`, 2, props.marker);

    var rb3AvgForTd = props.redzoneUtil.getRbAvgForCategory(`Rush_Rz_In_${props.marker}_Td`, 3, props.marker);
    var rb3AvgForCar = props.redzoneUtil.getRbAvgForCategory(`Rush_Rz_In_${props.marker}_Car`, 3, props.marker);
    var rb3AvgForTeamCar = props.redzoneUtil.getRbAvgForCategory(`Rush_Rz_In_${props.marker}`, 3, props.marker);
    var rb3AvgForTeamRzOpp = props.redzoneUtil.getRbAvgForCategory(`Rz_Opp_In_${props.marker}`, 3, props.marker);

    var rb1Median = props.redzoneUtil.getRbMedianForCategory(`Rush_Rz_In_${props.marker}_Car`, 1);
    var rb2Median = props.redzoneUtil.getRbMedianForCategory(`Rush_Rz_In_${props.marker}_Car`, 2);
    var rb3Median = props.redzoneUtil.getRbMedianForCategory(`Rush_Rz_In_${props.marker}_Car`, 3);

    this.state = {
      config: {
        chart: {
          type: 'column'
        },
        title: {
          text: `Red Zone Rushing Carries from Inside the ${props.marker} Yard Line`
        },
        xAxis: {
          categories: [props.player.Player, `RB1 Avg`, `RB2 Avg`, `RB3 Avg`, `RB 1.01 (${rb101.Player})`]
        },
        yAxis: {
          min: 0,
          title: {
            text: "Number",
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        series: [
          {
            name: `Player's TDs inside the ${props.marker}`,
            data: [props.player[`Rush_Rz_In_${props.marker}_Td`], rb1AvgForTd, rb2AvgForTd, rb3AvgForTd, rb101[`Rush_Rz_In_${props.marker}_Td`]]
          }, 
          {
            name: `Player's Carries inside the ${props.marker}`,
            data: [props.player[`Rush_Rz_In_${props.marker}_Car`], rb1AvgForCar, rb2AvgForCar, rb3AvgForCar, rb101[`Rush_Rz_In_${props.marker}_Car`]]
          }, 
          {
            name: `Team's Carries inside the ${props.marker}`,
            data: [props.team[`Rush_Rz_In_${props.marker}`], rb1AvgForTeamCar, rb2AvgForTeamCar, rb3AvgForTeamCar, rb101.teamData[`Rush_Rz_In_${props.marker}`]]
          },
          {
            name: `Team's Total RZ Opp inside the ${props.marker}`,
            data: [props.team[`Rz_Opp_In_${props.marker}`], rb1AvgForTeamRzOpp, rb2AvgForTeamRzOpp, rb3AvgForTeamRzOpp, rb101.teamData[`Rz_Opp_In_${props.marker}`]]
          }
        ]
      }
    }
  }

  render() {
    return (
      <div>
        <ReactHighcharts config={this.state.config} />
      </div>
    )
  }
}

export default Barchart;