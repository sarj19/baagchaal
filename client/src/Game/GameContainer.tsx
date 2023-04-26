import '../styles/Game.css';

import React, { useEffect, useReducer, useState } from 'react';

import Debug from './Debug';
import Game from './Game';
import GameInfoAndButtons from './GameStatus/GameInfoAndButtons';
import GameHeader from './Header/GameHeader';
import { gameStateReducer, initialState } from './reducers/gameStateReducer';
import { GameStateContext } from './reducers/useGameState';
import { getBoardSizeProps } from './utils/getBoardSizeProps';
import useInitializeStates from './utils/useInitializeStates';

export function GameContainer() {
  const [[size, isPotrait], setSizeProps] = useState(getBoardSizeProps());
  const stateReducer = useReducer(gameStateReducer, initialState);

  useInitializeStates(stateReducer[1]);

  useEffect(() => {
    function handleResize() {
      setSizeProps(getBoardSizeProps());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="gameContainer">
      <h1 className="title">BaagChaal</h1>
      <div className="content">
        <GameStateContext.Provider value={stateReducer}>
          <div>
            <Debug />
            <GameHeader />
            <Game boardSize={size} />
          </div>
          <GameInfoAndButtons fixed={isPotrait} />
        </GameStateContext.Provider>
      </div>
    </div>
  );
}
