import '../../styles/BoardOverlay.css';

import React from 'react';
import { Link } from 'react-router-dom';

import useGameContext from '../../reducers/useGameContext';

export function GameOver() {
  const { winner, designation, gameType } = useGameContext()[0];

  if (winner == null) {
    return <></>;
  }

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
