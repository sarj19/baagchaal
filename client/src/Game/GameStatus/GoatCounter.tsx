import '../../styles/common.css';
import '../../styles/GoatCounter.css';

import React from 'react';

import Goat from '../../common/Goat';
import { MAX_GOATS } from '../../common/types';
import useGameState, { GameStateContextReducer } from '../reducers/useGameState';
import { getNumberOfGoatsPlayed } from '../utils/goatsPlayed';

export default function GoatCounter() {
  const [state, _]: GameStateContextReducer = useGameState();

  return (
    <div className="goatCountContainer pill">
      <div className="counter">
        {MAX_GOATS - getNumberOfGoatsPlayed(state)} / 20
      </div>
      <div className="goatImage">
        <Goat height={64} />
      </div>
    </div>
  );
}
