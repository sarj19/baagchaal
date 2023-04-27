import React, { ReactNode, useMemo } from 'react';

import { Position } from '../../common/types';
import useGameState from '../reducers/useGameState';
import { ARR_0_TO_24 } from '../utils/consts';
import getDimension from '../utils/getDimension';
import { isAllGoatsPlayed } from '../utils/goatsPlayed';
import { isEmptySpace } from '../utils/isEmptySpace';
import {
    getGoatFavoredScore, getGoatFavoredScores, getTigerFavoredScores
} from '../utils/moveSelector';
import { getPossibleMovesForTiger } from '../utils/possibleMoves';

export function DebugPieceOverlay({ boardSize }: { boardSize: number }) {
  const [state, _] = useGameState();

  if (state.getTurn() == 'goat' && isAllGoatsPlayed(state)) {
    return (
      <>
        {state.goats.map((position) => {
          const possibleMoves = getPossibleMovesForTiger(
            position,
            state.tigers,
            state.goats
          );
          const scores = getGoatFavoredScores(state, possibleMoves);
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
  } else if (state.getTurn() == 'goat' /* need to place goats*/) {
    return (
      <>
        {ARR_0_TO_24.filter((position) =>
          isEmptySpace(position, state.goats, state.tigers)
        ).map((position) => {
          return (
            <DebugInfo boardSize={boardSize} position={position} key={position}>
              {getGoatFavoredScore(state, [position, position])}
              <br />
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
          const scores = getTigerFavoredScores(state, possibleMoves);
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
