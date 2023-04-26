import React, { ReactElement, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

import { Move, ServerData } from '../common/types';
import useGameContext from '../reducers/useGameContext';
import Board from './Board/Board';
import useGameState from './reducers/useGameState';
import { getRandomMove, getScoredMove } from './utils/moveSelector';
import { getPossibleMovesForGoats, getPossibleMovesForTigers } from './utils/possibleMoves';

export default function Game({
  boardSize,
}: {
  boardSize: number;
}): ReactElement {
  const [state, stateDispatch] = useGameState();
  const [{ userId, gameHash, gameType, designation, winner }, contextDispatch] =
    useGameContext();
  const prevTurn = useRef(state.getTurn());
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
            prevTurn.current = state.getTurn() == 'goat' ? 'tiger' : 'goat';
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
      if (prevTurn.current == state.getTurn()) return;
      prevTurn.current = state.getTurn();

      try {
        socketRef!.current!.emit('movepiece', {
          userId,
          gameHash,
          moves: state.moves,
        });
      } catch (err) {
        // TODO user server disconnected error message
      }
    } else if (gameType?.startsWith('bot_') && winner == null) {
      const movePiece = (selectedMove: Move | null) => {
        if (selectedMove != null) {
          const [from, to] = selectedMove;
          // give user feel by waiting
          setTimeout(() => {
            stateDispatch({ type: 'select', value: from });
            setTimeout(() => {
              stateDispatch({ type: 'select', value: to });
            }, 1000);
          }, 1000);
        }
      };

      // user's turn so let them play
      if (state.getTurn() == designation) return;

      let possibleMoves: Move[];
      if (designation == 'goat' /* bot is tiger */) {
        possibleMoves = getPossibleMovesForTigers(state);
      } /* bot is goat */ else {
        possibleMoves = getPossibleMovesForGoats(state);
      }

      if (gameType == 'bot_random') {
        movePiece(getRandomMove(possibleMoves));
      } else if (gameType == 'bot_scored') {
        movePiece(
          getScoredMove(
            state,
            possibleMoves,
            designation == 'goat' ? 'tiger' : 'goat'
          )
        );
      }
    } else if (gameType == 'self') {
      // update the designation after each turn as you are playing with yourself
      contextDispatch({
        type: 'designate',
        value: state.getTurn(),
      });
    }
  }, [state.moves, gameType]);

  return <Board boardSize={boardSize} />;
}