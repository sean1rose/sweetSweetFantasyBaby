import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';


class Combochart extends Component {
  constructor(props){
    super(props);
    // console.log('props - ', props.player, props.wrTargetUtil);
    // console.log('weekkkkk - ', props.wrTargetUtil.getWrOneFromWeek(1));
    console.log('props.comparison - ', props);

    this.state = {
      config: {
        chart: {
          zoomType: 'xy'
        },
        title: {
          text: `Week by Week Comparison`
        },
        xAxis: [{
          categories: ['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5', 'Wk6', 'Wk7', 'Wk8', 'Wk9', 'Wk10', 'Wk11', 'Wk12', 'Wk13', 'Wk14', 'Wk15', 'Wk16'],
          crosshair: true
        }],
        yAxis: [
          { // Primary yAxis | green axis | Temparture | TARGETS
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'Targets',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                min: 0,
                tickInterval: 1,
                max: 20,
                opposite: true
          },
          { // Secondary yAxis | blue axis | Rainfall | FANTASY PTS
              gridLineWidth: 0,
              title: {
                  text: 'Fantasy Pts',
                  style: {
                      color: Highcharts.getOptions().colors[0]
                  }
              },
              labels: {
                  format: '{value} pts',
                  style: {
                      color: Highcharts.getOptions().colors[0]
                  }
              },
              min: 0,
              max: 30,
              tickInterval: 6

          }, 
          { // Tertiary yAxis | black axis | Sea-Level Pressure | TD
              gridLineWidth: 0,
              title: {
                  text: 'Redzone Targets',
                  style: {
                      color: Highcharts.getOptions().colors[1]
                  }
              },
              labels: {
                  format: '{value}',
                  style: {
                      color: Highcharts.getOptions().colors[1]
                  }
              },
              tickInterval: 1,
              min: 0,
              max: 20,
              opposite: true
          }
        ],
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true
            }
          }
        },
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 35,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [
          {
              name: 'Fantasy Pts',
              type: 'column',
              yAxis: 1,
              data: props.wrTargetUtil.calcWeeklyTotal(props.player, "FantasyPts"),
              tooltip: {
                  valueSuffix: ' pts'
              },
              zIndex: 1
          },
          {
              name: 'Redzone Targets',
              type: 'spline',
              yAxis: 2,
              data: props.wrTargetUtil.calcWeeklyTotal(props.player, "RzTargets"),
            //   marker: {
            //       enabled: false
            //   },
            //   dashStyle: 'shortdot',
              tooltip: {
                  valueSuffix: ' rz targets'
              },
              zIndex: 2
          }, 
          {
              name: 'Targets',
              type: 'spline',
              data: props.wrTargetUtil.calcWeeklyTotal(props.player, "Targets"),
              tooltip: {
                  valueSuffix: ' targets'
              },
              zIndex: 3
          },
          {
            name: `WR1 Avg's Fantasy Pts`,
            type: 'column',
            yAxis: 1,
            data: props.wrTargetUtil.calcWeeklyAvg("FantasyPts"),
            tooltip: {
                valueSuffix: ' pts'
            },
            zIndex: 0
          },
        //   {
        //     name: `WR1 Avg's Redzone Targets`,
        //     type: 'spline',
        //     dashStyle: 'shortdot',
        //     yAxis: 2,
        //     data: props.wrTargetUtil.calcWeeklyAvg("RzTargets"),
        //     marker: {
        //         enabled: false
        //     },
        //     tooltip: {
        //         valueSuffix: ' rz targets'
        //     },
        //     zIndex: 2
        //   },
        //   {
        //     name: `WR1 Avg's Targets`,
        //     type: 'spline',
        //     dashStyle: 'shortdot',
        //     data: props.wrTargetUtil.calcWeeklyAvg("Targets"),
        //     marker: {
        //         enabled: false
        //     },
        //     tooltip: {
        //         valueSuffix: ' targets',
        //     },
        //     zIndex: 3
        //   }
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

export default Combochart;