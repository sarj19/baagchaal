import React, { ReactElement, useEffect, useRef } from 'react';

import useGameContext from '../../reducers/useGameContext';
import useGameState from '../reducers/useGameState';
import getNearestBoardPosition from '../utils/getNearestBoardPosition';
import { gameOver, isTurn } from '../utils/turn';
import board from './board.png';

type Props = { width: number; height: number };

export default function BoardDecor({ width, height }: Props): ReactElement {
  const boardRef = useRef<HTMLImageElement | null>(null);

  const [state, stateDispatch] = useGameState();
  const [gameContext, _] = useGameContext();

  useEffect(() => {
    if (gameOver(gameContext)) return;
    const boardImage = boardRef.current!;
    // @ts-ignore
    const board: HTMLDivElement = boardImage.parentElement!;

    const onDragEnd = (e: DragEvent | MouseEvent) => {
      if (!isTurn(state, gameContext.designation)) return;
      e.preventDefault();

      const boardPosition = getNearestBoardPosition(
        e.clientX,
        e.clientY,
        board
      );
      if (boardPosition == null) {
        stateDispatch({ type: 'select', value: boardPosition });
      } else {
        stateDispatch({ type: 'move', value: boardPosition });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!isTurn(state, gameContext.designation)) return;

      const _e = e.changedTouches.item(0);
      if (_e == null) {
        return null;
      }

      const boardPosition = getNearestBoardPosition(
        _e.clientX,
        _e.clientY,
        board
      );
      if (boardPosition == null) {
        stateDispatch({ type: 'select', value: boardPosition });
      } else {
        stateDispatch({ type: 'move', value: boardPosition });
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!isTurn(state, gameContext.designation)) {
        stateDispatch({ type: 'selected_without_turn' });
      } else {
        const boardPosition = getNearestBoardPosition(
          e.clientX,
          e.clientY,
          board
        );
        if (state.selectedPiece == null || boardPosition == null) {
          stateDispatch({ type: 'select', value: boardPosition });
        } else {
          stateDispatch({ type: 'move', value: boardPosition });
        }
      }
    };

    board.addEventListener('click', onClick);
    board.addEventListener('mouseup', onDragEnd);
    board.addEventListener('dragend', onDragEnd);
    board.addEventListener('touchend', onTouchEnd);

    return () => {
      board.removeEventListener('click', onClick);
      board.removeEventListener('mouseup', onDragEnd);
      board.removeEventListener('dragend', onDragEnd);
      board.removeEventListener('touchend', onTouchEnd);
    };
  }, [boardRef.current, state.moves, gameContext.designation]);

  return <img ref={boardRef} src={board} height={height} width={width} />;
}
