import React, { EventHandler, ReactElement, UIEvent, useRef } from 'react';

import Highlight from '../../common/Highlight';
import Tiger from '../../common/Tiger';
import { Position } from '../../common/types';
import useGameContext from '../../reducers/useGameContext';
import useGameState from '../reducers/useGameState';
import { gameOver, isTurn } from '../utils/turn';
import { useDraggablePiece } from './useDraggablePiece';

type Props = {
  boardSize: number;
  position: Position;
  selected: boolean;
  highlight: boolean;
};

export default function TigerPiece({
  boardSize,
  position,
  selected,
  highlight,
}: Props): ReactElement {
  const [state, stateDispatch] = useGameState();
  const gameContext = useGameContext()[0];
  const size = selected ? 90 : 70;
  const tiger = useRef<HTMLImageElement>(null);

  const [marginLeft, marginTop, setDragging] = useDraggablePiece(
    tiger,
    size,
    boardSize,
    position
  );
  const pieceClicked = () => {
    if (gameOver(gameContext)) return;
    if (isTurn(state, gameContext.designation)) {
      if (state.selectedPiece == null || position == null) {
        stateDispatch({ type: "select", value: position });
      } else {
        stateDispatch({ type: "move", value: position });
      }
    } else {
      stateDispatch({ type: "selected_without_turn" });
    }
  };

  const pieceDragged: EventHandler<UIEvent> = (e) => {
    e.preventDefault();
    if (gameOver(gameContext)) return;

    if (isTurn(state, gameContext.designation)) {
      setDragging(true);
      stateDispatch({ type: "select", value: position });
    } else {
      setDragging(false);
    }
  };

  const element = (
    <Tiger
      ref={tiger}
      onMouseDown={pieceDragged}
      onTouchStart={pieceDragged}
      onClick={pieceClicked}
      style={{
        marginLeft,
        marginTop,
        width: size,
        height: size,
      }}
    />
  );

  return highlight ? <Highlight element={element} /> : element;
}
