import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
var colors = Highcharts.getOptions().colors;

class Donutchart extends Component {
  constructor(props){
    super(props);
    var totalTargets = props.util.getTeamTotalTargets(props.team);
    var categories = ['Runningbacks', 'Wide Receivers', 'Tight Ends', 'Other'];
    var data = [
      {
        y: props.util.rbTargetPercentage(props.team),
        color: colors[0],
        drilldown: {
          name: 'Runningbacks',
          categories: props.util.getRbProperty(props.team, "Name"),
          data: props.util.getRbProperty(props.team, "Target %"),
          color: colors[0]
        }
      },
      {
        y: props.util.wrTargetPercentage(props.team),
        color: colors[1],
        drilldown: {
          name: 'Wide Receivers',
          categories: props.util.getWrProperty(props.team, "Name"),
          data: props.util.getWrProperty(props.team, "Target %"),
          color: colors[1]
        }
      },
      {
        // te data
        y: props.util.teTargetPercentage(props.team),
        color: colors[2],
        drilldown: {
          name: 'Tight Ends',
          categories: props.util.getTeProperty(props.team, "Name"),
          data: props.util.getTeProperty(props.team, "Target %"),
          color: colors[2]
        }
      },
      {
        // other pos data
        y: props.util.otherTargetPercentage(props.team),
        color: colors[3],
        drilldown: {
          name: 'Other',
          categories: props.util.getOtherProperty(props.team, "Name"),
          data: props.util.getOtherProperty(props.team, "Target %"),
          color: colors[3]
        }
      }
    ];

    var convertToPercent = function(fraction){
      return Math.round(fraction * 10000) / 100;
    };
    // data point calculations...
    var dataForPositions = [];
    var dataForPlayers = [];
    for(var i = 0; i < data.length; i++){      
      dataForPositions.push({
        name: categories[i],
        // y: data[i].y,
        y: convertToPercent(data[i].y),
        color: data[i].color
      });
      var drillDataLen = data[i].drilldown.data.length;
      for (var j = 0; j < drillDataLen; j++){
        var brightness = 0.25 - (j / drillDataLen) / 3;
        var firstName = data[i].drilldown.categories[j].split(', ')[1];
        var lastName = data[i].drilldown.categories[j].split(', ')[0];
        dataForPlayers.push({
          // name: data[i].drilldown.categories[j],
          name: firstName + ' ' + lastName,
          y: data[i].drilldown.data[j],
          color: Highcharts.Color(data[i].color).brighten(brightness).get()
        });
      }
    }

    this.state = {
      config: {
        chart: {
          type: 'pie',
        },
        title: {
          text: `Positional/Player Target Distribution`
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
          data: dataForPositions,
          size: '60%',
          dataLabels: {
            formatter: function () {
              return '<br>' + this.point.name + ':</b> ' + this.y + '%';
            },
            color: 'white',
            distance: 0,
            // x: 10,
            // y: 5
            zIndex: 7
          }
        },{
          name: '% of total targets',
          data: dataForPlayers,
          size: '80%',
          innerSize: '60%',
          dataLabels: {
            formatter: function () {
              var playerTotalTargets = Math.round(totalTargets * this.y * .01);
              // return this.y > 1 ? '<br>' + this.point.name + ':</b> ' + this.y + '%' + '<br>' + '(targets: ' + playerTotalTargets + ')' : null;
              return this.y > 1 ? '<br>' + this.point.name + ':</b> ' + this.y + '%' + '<br>' +  '[' + playerTotalTargets + ' targets]' : null;
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
        <ReactHighcharts config={this.state.config} />
      </div>
    )
  }
}

export default Donutchart;