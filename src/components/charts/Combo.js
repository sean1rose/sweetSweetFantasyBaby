import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import { FormControl } from 'react-bootstrap';

class Combochart extends Component {
  constructor(props){
    super(props);
    console.log('>props.comparison - ', props);
    
    var yAxisConfig = {};
    var seriesConfig = {};
    this.dropdownConfig;
    

    this.configObjectCreate = (param) => {
      // var self = this;
      switch(props.position){
        case 'wr':
          console.log('IN PROPS POSITION _ ', props.position);
          console.log("props.util.calcWeeklyTotal(props.player, 'RzTargets') - ", props.util.calcWeeklyTotal(props.player, 'RzTargets'));
          yAxisConfig.text = ['Fantasy Pts', 'Targets', 'Redzone Targets'];
          yAxisConfig.max = [28, 20, 20];
          yAxisConfig.tickInterval = [7];
          seriesConfig.name = ['Fantasy Pts', 'Targets', 'Redzone Targets', `WR${param} Avg's Fantasy Pts`, `WR${param} Avg's Targets`, `WR${param} Avg's Redzone Targets`];
          seriesConfig.data = [props.util.calcWeeklyTotal(props.player, 'FantasyPts'), props.util.calcWeeklyTotal(props.player, 'Targets'), props.util.calcWeeklyTotal(props.player, 'RzTargets'), props.util.calcWeeklyAvg('FantasyPts', param), props.util.calcWeeklyAvg('Targets', param), props.util.calcWeeklyAvg('RzTargets', param)];
          seriesConfig.valueSuffix = [' pts', ' targets', ' rz targets', ' pts', ' targets', ' rz targets'];
          this.dropdownConfig = ['WR1 Average', 'WR1.12', 'WR2 Average', 'WR3 Average'];
          break;
        case 'rb':
          console.log('>>>>>>>>> PARAM - ', param);
          yAxisConfig.text = ['Fantasy Pts', 'Touches', 'Redzone Touches'];
          yAxisConfig.max = [35, 30, 30];
          yAxisConfig.tickInterval = [5];
          seriesConfig.name = ['Fantasy Pts', 'Touches', 'Redzone Touches', `RB${param} Avg's Fantasy Pts`, `RB${param} Avg's Touches`, `RB${param} Avg's Redzone Touches`];
          seriesConfig.data = [props.util.calcWeeklyTotal(props.player, 'FantasyPts'), props.util.calcWeeklyTotal(props.player, 'Touches'), props.util.calcWeeklyTotal(props.player, 'RzTouches'), props.util.calcWeeklyAvg('FantasyPts', param), props.util.calcWeeklyAvg('Touches', param), props.util.calcWeeklyAvg('RzTouches', param)];
          // seriesConfig.data = [props.util.calcWeeklyTotal(props.player, 'FantasyPts'), [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]];
          seriesConfig.valueSuffix = [' pts', ' touches', ' rz touches', ' pts', ' touches', ' rz touches'];
          this.dropdownConfig = ['RB1 Average', 'RB1.12', 'RB2 Average', 'RB3 Average'];
          break;
      }

      var configObj = {
        chart: {
          zoomType: 'xy',
        },
        title: {
          text: `Week by Week Comparison`
        },
        xAxis: [{
          categories: ['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5', 'Wk6', 'Wk7', 'Wk8', 'Wk9', 'Wk10', 'Wk11', 'Wk12', 'Wk13', 'Wk14', 'Wk15', 'Wk16', 'AVG'],
          crosshair: true
        }],
        yAxis: [
          { // Primary yAxis | blue axis | Rainfall | FANTASY PTS === FTPTS
            gridLineWidth: 0,
            title: {
              text: yAxisConfig.text[0],
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
            max: yAxisConfig.max[0],
            tickInterval: yAxisConfig.tickInterval[0]
          }, 
          { // Secondary yAxis | green axis | Temparture | TARGETS === SNAPS
            title: {
              text: yAxisConfig.text[1],
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
            min: 0,
            max: yAxisConfig.max[1],
            opposite: true
          },
          { // Tertiary yAxis | black axis | Sea-Level Pressure | RZ TARGETS === RZ CARRIES
            gridLineWidth: 0,
            title: {
              text: yAxisConfig.text[2],
              style: {
                color: Highcharts.getOptions().colors[8]
              }
            },
            labels: {
              format: '{value}',
              style: {
                  color: Highcharts.getOptions().colors[8]
              }
            },
            min: 0,
            max: yAxisConfig.max[2],
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
        // legend: {
        //     layout: 'vertical',
        //     align: 'right',
        //     x: -125,
        //     verticalAlign: 'top',
        //     y: 0,
        //     floating: true,
        //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        // },
        series: [
          { // [0]
            name: seriesConfig.name[0],
            type: 'column',
            data: seriesConfig.data[0],
            tooltip: {
              valueSuffix: seriesConfig.valueSuffix[0]
            },
            zIndex: 1
          },
          { // [1]
            name: seriesConfig.name[1],
            yAxis: 1,
            type: 'spline',
            data: seriesConfig.data[1],
            tooltip: {
              valueSuffix: seriesConfig.valueSuffix[1]
            },
            zIndex: 3
          },
          { // [2]
            name: seriesConfig.name[2],
            type: 'spline',
            yAxis: 2,
            data: seriesConfig.data[2],
            color: Highcharts.getOptions().colors[8],
            tooltip: {
              valueSuffix: seriesConfig.valueSuffix[2]
            },
            zIndex: 2
          }, 
          { // [3]
            name: seriesConfig.name[3],
            type: 'column',
            // yAxis: 1,
            data: seriesConfig.data[3],
            color: param === 1 || param === 1.12 ? Highcharts.getOptions().colors[6] : param === 2 ? Highcharts.getOptions().colors[3] : "#CD853F",
            tooltip: {
              valueSuffix: seriesConfig.valueSuffix[3]
            },
            zIndex: 0
          },
          { // [4]
            name: seriesConfig.name[4],
            type: 'spline',
            yAxis: 1,
            dashStyle: 'shortdot',
            data: seriesConfig.data[4],
            color: Highcharts.getOptions().colors[1],
            marker: {
              enabled: false
            },
            tooltip: {
              valueSuffix: seriesConfig.valueSuffix[4]
            },
            zIndex: 3
          },
          { // [5]
            name: seriesConfig.name[5],
            type: 'spline',
            dashStyle: 'shortdot',
            yAxis: 2,
            data: seriesConfig.data[5],
			      // color: "#AAAAAA",
            // color: "#FFC0CB",
            color: Highcharts.getOptions().colors[8],
            marker: {
              enabled: false
            },
            tooltip: {
              valueSuffix: seriesConfig.valueSuffix[5]
            },
            zIndex: 2
          }
        ]
      }
      return configObj;
    }

    var rbOneFinishesInt = props.position === "rb" ? props.util.calcRbRankFinishes(props.name, 1) : null;
    var rbTwoFinishesInt = props.position === "rb" ? props.util.calcRbRankFinishes(props.name, 2) : null;
    var rbThreeFinishesInt = props.position === "rb" ? props.util.calcRbRankFinishes(props.name, 3) : null;
    var wrOneFinishesInt = props.position === "wr" ? props.util.calcWrOneFinishes(props.name) : null;

    this.state = {
      config: this.configObjectCreate(1),
      rbOneFinishes: props.position === "rb" ? rbOneFinishesInt.total : null,
      rbTwoFinishes: props.position === "rb" ? rbTwoFinishesInt.total : null,
      rbThreeFinishes: props.position === "rb" ? rbThreeFinishesInt.total : null,
      wrOneFinishes: props.position === "wr" ? wrOneFinishesInt.total : null,
      rbOneFinishesPercent: props.position === "rb" ? props.util.convertToPercent(rbOneFinishesInt.percent) : null,
      rbTwoFinishesPercent: props.position === "rb" ? props.util.convertToPercent(rbTwoFinishesInt.percent) : null,
      rbThreeFinishesPercent: props.position === "rb" ? props.util.convertToPercent(rbThreeFinishesInt.percent) : null,
      wrOneFinishesPercent: props.position === "wr" ? props.util.convertToPercent(wrOneFinishesInt.percent) : null
    };

    // var wrOneFinishes;
    // var rbOneFinishes;
    // if (props.position === "wr"){
    //   wrOneFinishes = props.util.calcWrOneFinishes(props.name);
    //   console.log('wrOneFinishes - ', wrOneFinishes);
    // } else if (props.position === "rb"){
    //   rbOneFinishes = props.util.calcRbrOneFinishes(props.name);
    //   console.log('rbOneFinishes - ', rbOneFinishes);
    // }

		this.configObjectCreate = this.configObjectCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    /*
        AS A FORMCONTROL ATTRIBUTE ---> inputRef={el => this.inputEl=el }
    */
    console.log('2 - e - ', e.target.value);
    switch(e.target.value){
      case '1':
        this.setState({
					config: this.configObjectCreate(1)
        });
        break;
			case '1.12':
				this.setState({
					config: this.configObjectCreate(1.12)
				});
				break;
      case '2':
        this.setState({
					config: this.configObjectCreate(2)
        });
        break;
      case '3':
        this.setState({
					config: this.configObjectCreate(3)
        });
        break;
    }
  }

  render() {
    const boldOneFinishes = this.state.wrOneFinishes ? `<b>${this.state.wrOneFinishes}</b>` : `<b>${this.state.rbOneFinishes}</b>`
    return (
      <div>
        <div className="headerContainer">
          <h1>{this.props.name}</h1>
          vs.
          <div className="formHolder">
            <FormControl
            onChange={this.handleChange}
            componentClass="select"
            defaultValue="1" 
            >
            <option value="1"> {this.dropdownConfig[0]}</option>
            <option value="1.12"> {this.dropdownConfig[1]}</option>
            <option value="2"> {this.dropdownConfig[2]}</option>
            <option value="3"> {this.dropdownConfig[3]}</option>
            </FormControl>
          </div>
        </div>
        <ReactHighcharts config={this.state.config} />
        <div className="headerContainer">
          <h4>Consistency:</h4>
          <div><span>Number of {this.props.position === "wr" ? "WR1 Finishes: " : "RB1 Finishes: "}</span><span style={{"fontWeight": "bold"}}> {this.state.wrOneFinishes ? this.state.wrOneFinishes : this.state.rbOneFinishes}</span><span> ({this.state.rbOneFinishesPercent ? this.state.rbOneFinishesPercent : this.state.wrOneFinishesPercent}% of playable games)</span></div>    
          <div><span>Number of {this.props.position === "wr" ? "WR2 Finishes (24th ranked WR or above): " : "RB2 Finishes (24th ranked RB or above): "}</span><span style={{"fontWeight": "bold"}}> {this.state.rbTwoFinishes ? this.state.rbTwoFinishes : null }</span><span> ({this.state.rbTwoFinishesPercent ? this.state.rbTwoFinishesPercent : this.state.wrTwoFinishesPercent}% of playable games)</span></div>
          <div><span>Number of {this.props.position === "wr" ? "WR3 Finishes (36th ranked WR or above): " : "RB3 Finishes (36th ranked RB or above): "}</span><span style={{"fontWeight": "bold"}}> {this.state.rbThreeFinishes ? this.state.rbThreeFinishes : null }</span><span> ({this.state.rbThreeFinishesPercent ? this.state.rbThreeFinishesPercent : this.state.wrThreeFinishesPercent}% of playable games)</span></div>
        </div>
      </div>
    )
  }
}

export default Combochart;
