import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
// var colors = Highcharts.getOptions().colors;

class Barchart extends Component {
  constructor(props){
    super(props);
    // console.log('getTopRbInCategory!!!! - ', props.redzoneUtil.getTopRbInCategory(`Rush_Rz_In_${props.marker}_Car`));
    var rb101 = props.redzoneUtil.getTopRbInCategory(`Rush_Rz_In_${props.marker}_Car`);
    var rb1Median = props.redzoneUtil.getRbMedianForCategory(`Rush_Rz_In_${props.marker}_Car`, 1);
    var rb2Median = props.redzoneUtil.getRbMedianForCategory(`Rush_Rz_In_${props.marker}_Car`, 2);
    var rb3Median = props.redzoneUtil.getRbMedianForCategory(`Rush_Rz_In_${props.marker}_Car`, 3);
    console.log('----> rb1Median!!! - ', rb1Median.Player);
    console.log('----> rb 2 median  -', rb2Median.Player);
    console.log('----> rb 3 median  -', rb3Median.Player);
    this.state = {
      config: {
        chart: {
          type: 'column'
        },
        title: {
          text: `Red Zone Rushing Carries from Inside the ${props.marker} Yard Line`
        },
        xAxis: {
          categories: [props.player.Player, `${rb101.Player} [RB 1.01]`, `${rb1Median.Player} [RB1 Median]`, `${rb2Median.Player} (RB2 Median)`, `${rb3Median.Player} (RB3 Avg)`]
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
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: 0,
          y: 0,
          floating: true,
          borderWidth: 1,
          shadow: true
        },
        series: [
          {
            name: `Player's TDs`,
            data: [props.player[`Rush_Rz_In_${props.marker}_Td`], rb101[`Rush_Rz_In_${props.marker}_Td`], rb1Median[`Rush_Rz_In_${props.marker}_Td`], rb2Median[`Rush_Rz_In_${props.marker}_Td`], rb3Median[`Rush_Rz_In_${props.marker}_Td`]]
          }, 
          {
            name: `Player's Carries`,
            data: [props.player[`Rush_Rz_In_${props.marker}_Car`], rb101[`Rush_Rz_In_${props.marker}_Car`], rb1Median[`Rush_Rz_In_${props.marker}_Car`], rb2Median[`Rush_Rz_In_${props.marker}_Car`], rb3Median[`Rush_Rz_In_${props.marker}_Car`]]
          }, 
          {
            name: `Team's Carries from the ${props.marker}`,
            data: [props.team[`Rush_Rz_In_${props.marker}`], rb101.teamData[`Rush_Rz_In_${props.marker}`], rb1Median.teamData[`Rush_Rz_In_${props.marker}`], rb2Median.teamData[`Rush_Rz_In_${props.marker}`], rb3Median.teamData[`Rush_Rz_In_${props.marker}`]]
          },
          {
            name: `Team's Total RZ Opp from the ${props.marker}`,
            data: [props.team[`Rz_Opp_In_${props.marker}`], rb101.teamData[`Rz_Opp_In_${props.marker}`], rb1Median.teamData[`Rz_Opp_In_${props.marker}`], rb2Median.teamData[`Rz_Opp_In_${props.marker}`], rb3Median.teamData[`Rz_Opp_In_${props.marker}`]]
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