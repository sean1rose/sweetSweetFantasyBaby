import React from 'react';
import {Link} from 'react-router-dom';
import PlayerApi from './PlayerApi';

const Player = (props) => {
  const player = PlayerApi.get(
    parseInt(props.match.params.number, 10)
  )
  if (!player) {
    return <div>Sorry no player was found</div>
  }
  return (
    <div>
      <h1>{player.name}(#{player.number})</h1>
      <h2>Position: {player.position}</h2>
      <Link to='/roster'>Back</Link>
    </div>
  )
};

export default Player;