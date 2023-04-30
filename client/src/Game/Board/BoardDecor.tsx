import React, { ReactElement, useEffect, useRef } from 'react';

import useGameContext from '../../reducers/useGameContext';
import useGameState from '../reducers/useGameState';
import getNearestBoardPosition from '../utils/getNearestBoardPosition';
import { isTurn } from '../utils/turn';
import board from './board.png';

type Props = { width: number; height: number };

export default function BoardDecor({ width, height }: Props): ReactElement {
  const boardRef = useRef<HTMLImageElement | null>(null);

  const [state, stateDispatch] = useGameState();
  const [{ designation, winner }, _] = useGameContext();

  useEffect(() => {
    const board = boardRef.current!;
    const listener = (e: MouseEvent) => {
      if (winner != null) return;
      if (!isTurn(state, designation)) {
        stateDispatch({ type: 'selected_without_turn' });
      } else {
        const boardPosition = getNearestBoardPosition(e, board);
        stateDispatch({ type: 'select', value: boardPosition });
      }
    };
    board.addEventListener('click', listener);

    return () => {
      board.removeEventListener('click', listener);
    };
  }, [boardRef.current, state.moves, designation]);

  return <img ref={boardRef} src={board} height={height} width={width} />;
}
