import React, { ReactElement, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import { ServerData } from '../common/types';
import useGameContext from '../reducers/useGameContext';
import Board from './Board/Board';
import useGameState from './reducers/useGameState';
import { getScoredMove } from './utils/moveSelector';
import { getTurn } from './utils/turn';

export default function Game({
  boardSize,
}: {
  boardSize: number;
}): ReactElement {
  const [state, stateDispatch] = useGameState();
  const [
    { userId, gameHash, gameType, designation, winner, botLevel },
    contextDispatch,
  ] = useGameContext();
  const prevTurn = useRef(getTurn(state));
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (gameType == 'p2p_internet') {
      const socket = io({ auth: { token: gameHash } })
        .onAny((event, args) => {
          console.log('received', event, args);
        })
        .onAnyOutgoing((event, args) => {
          console.log('sending', event, args);
        })
        .on('connect_error', (err) => {
          console.log(`connect_error due to ${err.message}`);
        })
        .on('movepiece', (data: ServerData) => {
          // TODO verify opponent's userId after storing it for first time
          // use opponent id instead of players count
          if (data.gameHash == gameHash) {
            prevTurn.current = getTurn(state) == 'goat' ? 'tiger' : 'goat';
            stateDispatch({ type: 'server', value: data.moves });
          }
        })
        .once('opponentJoined', (opponentId) => {
          contextDispatch({ type: 'set_opponent', opponentId });
        })
        .emit('gamejoined', { userId, gameHash });

      socketRef.current = socket;
      return () => {
        socket.disconnect();
      };
    }
  }, [gameType, gameHash]);

  useEffect(() => {
    if (gameType == 'p2p_internet') {
      if (prevTurn.current == getTurn(state)) return;
      prevTurn.current = getTurn(state);

      try {
        socketRef!.current!.emit('movepiece', {
          userId,
          gameHash,
          moves: state.moves,
        });
      } catch (err) {
        // TODO user server disconnected error message
      }
    } else if (gameType == 'bot' && winner == null) {
      // user's turn so let them play
      if (
        getTurn(state) == designation ||
        designation == null ||
        state == null
      ) {
        return;
      }

      stateDispatch({ type: 'bot_thinking' });
      getScoredMove(state, botLevel ? botLevel : 2, (selectedMove) => {
        if (selectedMove != null) {
          const [from, to] = selectedMove;
          // give user feel by waiting
          stateDispatch({ type: 'select', value: from });
          setTimeout(() => {
            stateDispatch({ type: 'select', value: to });
          }, 1000);
        }
      });
    } else if (gameType == 'self') {
      // update the designation after each turn as you are playing with yourself
      contextDispatch({
        type: 'designate',
        value: getTurn(state),
      });
    }
  }, [state.moves, gameType]);

  return <Board boardSize={boardSize} />;
}
