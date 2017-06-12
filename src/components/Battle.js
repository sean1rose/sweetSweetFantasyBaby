import React, { Component } from 'react';
import PlayerInput from './PlayerInput';
import {Link} from 'react-router-dom';
// import history from './History';

// RECAP: https://www.youtube.com/watch?v=z_OpiP_b6HY @ 20:30 
class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName: '',
      playerTwoName: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, playername) {
    // this.setState(() => {
    //   console.log('clicked SUBMIT, history object - ', history);
    //   var newState = {};
    //   newState[id + 'Name'] = playername;
    //   return newState;
    // });
    this.setState((prevState, props) => {
      if (prevState.playerOneName || prevState.playerTwoName){
        // currently changing route to schedule. TODO: display chart comparison of both players...
        return this.props.history.push('/schedule');
      } else {
        var newState = {};
        newState[id + 'Name'] = playername;
        return newState;
      }
    });
  }
  
  render() {
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    return (
      <div>
        <div className='row'>
          {!playerOneName && 
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit} />}

          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit} />}

        </div>
        {/*{playerOneName && playerTwoName &&
        <Link
          className='button'
          to={{
            pathname: match.url + '/results',
            search: `?playerOneName=` + playerOneName + '&playerTwoName=' + playerTwoName
          }}>
          Battle
        </Link>}*/}
      </div>
    );
  }
}

export default Battle;