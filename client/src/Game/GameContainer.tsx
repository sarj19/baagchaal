import '../styles/Game.css';

import React, { useReducer } from 'react';
import { Outlet } from 'react-router-dom';

import { gameStateReducer, initialState } from './reducers/gameStateReducer';
import { GameStateContext } from './reducers/useGameState';

export default function GameContainer() {
  const stateReducer = useReducer(gameStateReducer, initialState);

  return (
    <GameStateContext.Provider value={stateReducer}>
      <Outlet />
    </GameStateContext.Provider>
  );
}
