import './styles/App.css';

import React, { useEffect, useReducer } from 'react';
import { RouterProvider } from 'react-router-dom';

import { gameContextReducer, initialState } from './reducers/gameContextReducer';
import { GameContextContext } from './reducers/useGameContext';
import { router } from './routes';

export default function App() {
  const reducer = useReducer(gameContextReducer, initialState);

  useEffect(() => {
    const userId = reducer[0].userId;
    if (userId == null) {
      window.localStorage.removeItem("userId");
    } else {
      window.localStorage.setItem("userId", userId);
    }
  }, [reducer[0].userId]);

  return (
    <GameContextContext.Provider value={reducer}>
      <RouterProvider router={router} />
    </GameContextContext.Provider>
  );
}
