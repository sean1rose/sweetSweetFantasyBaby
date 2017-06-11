import React, { Component } from 'react';
import PlayerInput from './PlayerInput';

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
    this.setState(() => {
      var newState = {};
      newState[id + 'Name'] = playername;
      return newState;
    });
  }
  
  render() {
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
      </div>
    );
  }
}

export default Battle;