import '../styles/Game.css';

import React, { Suspense, useReducer } from 'react';
import { Outlet } from 'react-router-dom';

import { Loading } from '../common/Loading';
import { gameStateReducer, initialState } from './reducers/gameStateReducer';
import { GameStateContext } from './reducers/useGameState';

export default function GameContainer() {
  const stateReducer = useReducer(gameStateReducer, initialState);

  return (
    <GameStateContext.Provider value={stateReducer}>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </GameStateContext.Provider>
  );
}
