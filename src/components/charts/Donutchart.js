import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import HighchartsExporting from 'highcharts-exporting';
import Highcharts from 'highcharts';
HighchartsMore(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);


class Donutchart extends Component {
  constructor(props){
    super(props);
    console.log('IN DONUT CHART COMPONENT, props is - ', props);
    var positionData = [
      {
        name: "Runningbacks",
        y: props.util.rbTargetPercentage(props.team),
        color: "#7cb5ec"
      },
      {
        name: "Wide Receivers",
        y: props.util.wrTargetPercentage(props.team),
        color: "#434348"
      },
      {
        name: "Tight Ends",
        y: props.util.teTargetPercentage(props.team),
        color: "#90ed7d"
      },
      {
        name: "Other",
        y: props.util.otherTargetPercentage(props.team),
        color: "#f7a35c"
      }
    ];
    console.log('positondata - ', positionData);
    var playerData = [];
    for (var i = 0; i < props.team.length; i++){
      var current = props.team[i];
      var firstName = current.Name.split(', ')[1];
      var lastName = current.Name.split(', ')[0];
      var tmpObj = {
        name: firstName + ' ' + lastName,
        y: current["Target %"],
        color: Highcharts.getOptions().colors[i]
      }
      playerData.push(tmpObj);
    }
    this.state = {
      config: {
        chart: {
          type: 'pie',
        },
        title: {
          text: `${props.teamName} Positional/Player Target Distribution`
        },
        yAxis: {
          title: {
            text: 'Total percent target share'
          }
        },
        plotOptions: {
          pie: {
            shadow: false,
            center: ['50%', '50%']
          }
        },
        tooltip: {
          valueSuffix: '%'
        },
        series: [{
          name: '% of total targets',
          data: positionData,
          size: '65%',
          dataLabels: {
            formatter: function () {
              var convertToPercent = function(fraction){
                return Math.round(fraction * 10000) / 100;
              };
              // return this.y > 5 ? this.point.name : null;
              console.log('1 this.point name - ', this.point.name);
              return '<br>' + this.point.name + ':</b> ' + convertToPercent(this.y) + '%';
            },
            color: 'white',
            distance: -10
          }
        },{
          name: '% of total targets',
          data: playerData,
          size: '80%',
          innerSize: '65%',
          dataLabels: {
            formatter: function () {
              console.log('2 this.point name - ', this.point.name);
              return this.y > 1 ? '<br>' + this.point.name + ':</b> ' + this.y + '%' : null;
            }
          },
          id: 'positions'
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 400
            },
            chartOptions: {
              series: [{
                id: 'versions',
                dataLabels: {
                  enabled: false
                }
              }]
            }
          }]
        }
      }
    }
  }

  render() {
    return (
      <div>
        <ReactHighcharts config={this.state.config} ref="chart" />
      </div>
    )
  }
}

export default Donutchart;