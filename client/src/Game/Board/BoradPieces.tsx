import React from 'react';

import { Position } from '../../common/types';
import useGameContext from '../../reducers/useGameContext';
import useGameState from '../reducers/useGameState';
import getHintHighlightPositions from '../utils/getHintHighlightPositions';
import { isTurn } from '../utils/turn';
import GoatPiece from './GoatPiece';
import TigerPiece from './TigerPiece';

export default function BoradPieces({ boardSize }: { boardSize: number }) {
  const [state, stateDispatch] = useGameState();
  const [context, _] = useGameContext();
  const { designation, winner } = context;

  const [highlight, possibleNewPosForGoats] = getHintHighlightPositions(
    state,
    context
  );

  const pieceClicked = (position: Position | null) => {
    if (winner != null) return;
    if (isTurn(state, designation)) {
      stateDispatch({ type: 'select', value: position });
    } else {
      stateDispatch({ type: 'selected_without_turn' });
    }
  };

  return (
    <>
      {state.tigers.map((position) => (
        <TigerPiece
          boardSize={boardSize}
          position={position}
          selected={position == state.selectedPiece}
          highlight={highlight.has(position)}
          key={position}
          onClick={() => pieceClicked(position)}
        />
      ))}
      {state.goats.map((position) => (
        <GoatPiece
          boardSize={boardSize}
          position={position}
          selected={position == state.selectedPiece}
          type={highlight.has(position) ? 'highlight' : 'default'}
          key={position}
          onClick={() => pieceClicked(position)}
        />
      ))}
      {state.selectedPiece != null &&
      isTurn(state, 'goat') &&
      !state.goats.includes(state.selectedPiece) ? (
        <GoatPiece
          boardSize={boardSize}
          position={state.selectedPiece}
          selected={false}
          type="gray"
          key={state.selectedPiece}
          onClick={() => pieceClicked(state.selectedPiece)}
        />
      ) : null}
      {/* {possibleNewPosForGoats.map((position) => (
        <GoatPiece
          position={position}
          selected={false}
          type="gray"
          key={position}
          onClick={() => pieceClicked(position)}
        />
      ))} */}
    </>
  );
}
