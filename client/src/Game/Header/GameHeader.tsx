import '../../styles/GameHeader.css';

import React, { useEffect } from 'react';

import useGameContext from '../../reducers/useGameContext';
import useGameState from '../reducers/useGameState';
import { getWinner } from '../utils/getWinner';
import MessageBanner from './MessageBanner';
import Turn from './Turn';
import WaitingForOtherPlayer from './WaitingForOtherPlayer';

export default function GameHeader() {
  const [{ gameType, opponentId }, contextDispatcher] = useGameContext();
  const [state, stateDispatcher] = useGameState();

  useEffect(() => {
    const winner = getWinner(state);
    if (winner) {
      contextDispatcher({ type: 'set_winner', value: winner });
      stateDispatcher({ type: 'gameover', value: winner });
    }
  }, [state.moves]);

  return (
    <div className="pill turnContainer">
      {gameType === 'p2p_internet' && opponentId === null && (
        <WaitingForOtherPlayer />
      )}
      {state.message == null && <Turn />}
      {state.message != null && <MessageBanner message={state.message} />}
    </div>
  );
}
