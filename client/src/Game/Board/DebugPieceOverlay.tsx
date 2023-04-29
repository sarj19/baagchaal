import React, { ReactNode, useMemo } from 'react';

import { Position } from '../../common/types';
import { gameStateReducer } from '../reducers/gameStateReducer';
import useGameState from '../reducers/useGameState';
import { getScore } from '../utils/bestBotMove';
import getDimension from '../utils/getDimension';
import { isAllGoatsPlayed } from '../utils/goats';
import { getPossibleMovesForGoat, getPossibleMovesForTiger } from '../utils/possibleMoves';
import { isTurn } from '../utils/turn';
import { ARR_0_TO_24, isEmptySpace } from '../utils/validPositions';

export function DebugPieceOverlay({ boardSize }: { boardSize: number }) {
  const [state, _] = useGameState();

  if (isTurn(state, 'goat') && isAllGoatsPlayed(state)) {
    return (
      <>
        {state.goats.map((position) => {
          const possibleMoves = getPossibleMovesForGoat(position, state);
          const scores = possibleMoves.map(([from, to]) => {
            const newState = gameStateReducer(state, {
              type: 'move_directly',
              from,
              to,
            });
            return getScore(newState);
          });
          return (
            <DebugInfo boardSize={boardSize} position={position} key={position}>
              {possibleMoves.map((v, i) => (
                <>
                  {v[1]} -&gt; {-scores[i]}
                  <br />
                </>
              ))}
            </DebugInfo>
          );
        })}
      </>
    );
  } else if (isTurn(state, 'goat') /* need to place goats*/) {
    return (
      <>
        {ARR_0_TO_24.filter((position) =>
          isEmptySpace(position, state.goats, state.tigers)
        ).map((position) => {
          const newState = gameStateReducer(state, {
            type: 'move_directly',
            from: position,
            to: position,
          });
          const score = getScore(newState);

          return (
            <DebugInfo boardSize={boardSize} position={position} key={position}>
              {-score}
            </DebugInfo>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        {state.tigers.map((position) => {
          const possibleMoves = getPossibleMovesForTiger(
            position,
            state.tigers,
            state.goats
          );
          const scores = possibleMoves.map(([from, to]) => {
            const newState = gameStateReducer(state, {
              type: 'move_directly',
              from,
              to,
            });
            return getScore(newState);
          });

          return (
            <DebugInfo boardSize={boardSize} position={position} key={position}>
              {possibleMoves.map((v, i) => (
                <>
                  {v[1]} -&gt; {scores[i]}
                  <br />
                </>
              ))}
            </DebugInfo>
          );
        })}
      </>
    );
  }
}

function DebugInfo({
  boardSize,
  position,
  children,
}: {
  boardSize: number;
  position: Position;
  children: ReactNode;
}) {
  const j = Math.floor(position / 5);
  const i = position - j * 5;

  const { padding, spacing } = useMemo(
    () => getDimension(boardSize),
    [boardSize]
  );
  const x = padding + i * spacing;
  const y = padding + j * spacing;

  return (
    <div
      style={{
        marginLeft: x,
        marginTop: y,
        position: 'absolute',
        backgroundColor: 'black',
      }}
    >
      {children}
    </div>
  );
}
