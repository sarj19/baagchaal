import React, { ReactElement, useEffect, useRef } from 'react';

import useGameContext from '../../reducers/useGameContext';
import useGameState from '../reducers/useGameState';
import getNearestBoardPosition from '../utils/getNearestBoardPosition';
import { isTurn } from '../utils/turn';
import { CanvasContext, CanvasContextType } from '../utils/useCanvasRef';
import BoardGrid from './BoardGrid';

type Props = { width: number; height: number };

export default function BoardDecor({ width, height }: Props): ReactElement {
  const canvasRef: CanvasContextType = useRef(null);

  const [state, stateDispatch] = useGameState();
  const [{ designation, winner }, _] = useGameContext();

  const canvas = canvasRef.current;
  if (canvas != null) {
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, width, height);
  }

  useEffect(() => {
    const canvas = canvasRef!.current!;

    const listener = (e: MouseEvent) => {
      if (winner != null) return;
      if (!isTurn(state, designation)) {
        stateDispatch({ type: 'selected_without_turn' });
      } else {
        const boardPosition = getNearestBoardPosition(e, canvas);
        stateDispatch({ type: 'select', value: boardPosition });
      }
    };
    canvas.addEventListener('click', listener);

    return () => {
      canvas.removeEventListener('click', listener);
    };
  }, [canvasRef.current, state.moves, designation]);

  return (
    <canvas ref={canvasRef} height={height} width={width}>
      <CanvasContext.Provider value={canvasRef}>
        <BoardGrid />
      </CanvasContext.Provider>
    </canvas>
  );
}
