import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
// var colors = Highcharts.getOptions().colors;

class Barchart extends Component {
  constructor(props){
    super(props);
    console.log('getTopRbInCategory!!!! - ', props.redzoneUtil.getTopRbInCategory(`Rush_Rz_In_${props.marker}_Car`));
    var rb101 = props.redzoneUtil.getTopRbInCategory(`Rush_Rz_In_${props.marker}_Car`);
    this.state = {
      config: {
        chart: {
          type: 'bar'
        },
        title: {
          text: `Red Zone Rushing Carries from Inside the ${props.marker} Yard Line`
        },
        xAxis: {
          categories: [props.player.Player, 'RB 1.01 (category)', 'RB1 Avg', 'RB2 Avg', 'RB3 Avg']
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
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          shadow: true
        },
        series: [
          {
            name: `Player's TDs`,
            data: [props.player[`Rush_Rz_In_${props.marker}_Td`], rb101[`Rush_Rz_In_${props.marker}_Td`], 635, 203, 2]
          }, 
          {
            name: `Player's Carries`,
            data: [props.player[`Rush_Rz_In_${props.marker}_Car`], rb101[`Rush_Rz_In_${props.marker}_Car`], 947, 408, 6]
          }, 
          {
            name: `Team's Carries`,
            data: [props.team[`Rush_Rz_In_${props.marker}`], rb101.teamData[`Rush_Rz_In_${props.marker}`], 1250, 740, 38]
          },
          {
            name: `Team's Red Zone Opportunities`,
            data: [props.team[`Rz_Opp_In_${props.marker}`], rb101.teamData[`Rz_Opp_In_${props.marker}`],300,80,50]
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