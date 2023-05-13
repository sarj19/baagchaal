import '../../styles/common.css';
import '../../styles/GoatCounter.css';

import React from 'react';

import Goat from '../../common/Goat';
import { MAX_GOATS } from '../../common/types';
import useGameState, { GameStateContextReducer } from '../reducers/useGameState';
import { getNumberOfGoatsPlayed } from '../utils/goats';

export default function GoatCounter() {
  const [state, _]: GameStateContextReducer = useGameState();

  return (
    <>
      <div className="goatCountContainer pill">
        Goat Left {MAX_GOATS - getNumberOfGoatsPlayed(state)}
      </div>
      <div className="goatCountContainer pill">
        Goat Eaten {getNumberOfGoatsPlayed(state) - state.goats.length}
      </div>
    </>
  );
}
