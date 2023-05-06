import React, { MouseEventHandler, ReactElement, useRef } from 'react';

import Ghosted from '../../common/Ghosted';
import Goat from '../../common/Goat';
import Highlight from '../../common/Highlight';
import { Position } from '../../common/types';
import useGameContext from '../../reducers/useGameContext';
import useGameState from '../reducers/useGameState';
import { gameOver, isTurn } from '../utils/turn';
import { useDraggablePiece } from './useDraggablePiece';

type Props = {
  boardSize: number;
  position: Position;
  selected: boolean;
  type: 'highlight' | 'gray' | 'default';
};
export default function GoatPiece({
  boardSize,
  position,
  selected,
  type,
}: Props): ReactElement {
  const [state, stateDispatch] = useGameState();
  const gameContext = useGameContext()[0];
  const size = selected ? 90 : 70;
  const goat = useRef<HTMLImageElement>(null);

  const [marginLeft, marginTop, setDragging] = useDraggablePiece(
    goat,
    size,
    boardSize,
    position
  );
  const pieceClicked = () => {
    if (gameOver(gameContext)) return;
    if (isTurn(state, gameContext.designation)) {
      if (state.selectedPiece == null || position == null) {
        stateDispatch({ type: 'select', value: position });
      } else {
        stateDispatch({ type: 'move', value: position });
      }
    } else {
      stateDispatch({ type: 'selected_without_turn' });
    }
  };

  const pieceDragged: MouseEventHandler<HTMLImageElement> = (e) => {
    if (gameOver(gameContext)) return;
    if (isTurn(state, gameContext.designation)) {
      setDragging(true);
      e.preventDefault();
      stateDispatch({ type: 'select', value: position });
    }
  };

  const element = (
    <Goat
      ref={goat}
      onMouseDown={pieceDragged}
      onClick={pieceClicked}
      style={{
        marginLeft,
        marginTop,
        width: size,
        height: size,
      }}
    />
  );

  if (type === 'highlight') {
    return <Highlight element={element} />;
  } else if (type === 'gray') {
    return <Ghosted element={element} />;
  }

  return element;
}
