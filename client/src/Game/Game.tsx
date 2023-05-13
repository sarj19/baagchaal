import '../styles/Game.css';

import React, { useEffect, useState } from 'react';

import useGameContext from '../reducers/useGameContext';
import BoardContainer from './BoardContainer';
import Debug from './Debug';
import GameInfoAndButtons from './GameStatus/GameInfoAndButtons';
import GameHeader from './Header/GameHeader';
import useGameState from './reducers/useGameState';
import { getBoardSizeProps } from './utils/getBoardSizeProps';
import useInitializeStates from './utils/useInitializeStates';

export default function Game() {
  const [[size, isPotrait], setSizeProps] = useState(getBoardSizeProps());
  const stateDispatch = useGameState()[1];
  const { debug } = useGameContext()[0];

  useInitializeStates(stateDispatch);

  useEffect(() => {
    function handleResize() {
      setSizeProps(getBoardSizeProps());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="gameContainer">
      <div className="content">
        <div>
          {debug && <Debug />}
          <GameHeader />
          <BoardContainer boardSize={size} />
        </div>
        <GameInfoAndButtons fixed={isPotrait} />
      </div>
    </div>
  );
}
