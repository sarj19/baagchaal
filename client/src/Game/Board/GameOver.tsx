import '../../styles/BoardOverlay.css';

import React from 'react';
import { Link } from 'react-router-dom';

import useGameContext from '../../reducers/useGameContext';
import { gameOver } from '../utils/turn';

export function GameOver() {
  const gameContext = useGameContext()[0];

  if (!gameOver(gameContext)) {
    return <></>;
  }

  const { winner, designation, gameType } = gameContext;

  let displayText = `${winner} won`;
  if (gameType == 'self') {
    // default text
  } else if (designation == winner) {
    displayText = 'You won!';
  } else if (designation != winner) {
    displayText = 'You lost!';
  }

  return (
    <div className="boardOverlayContainer">
      <div>{displayText}</div>
      <Link to="/new">
        <button className="pill playNewGameButton"> Play new game </button>
      </Link>
    </div>
  );
}
