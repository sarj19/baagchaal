import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import Point from '../../common/Point';
import { Position } from '../../common/types';
import getDimension from '../utils/getDimension';

export function useDraggablePiece(
  element: React.RefObject<HTMLImageElement>,
  size: number,
  boardSize: number,
  position: Position
): [number, number, Dispatch<SetStateAction<boolean>>] {
  const [dragging, setDragging] = useState(false);
  const [mousePos, setMousePos] = useState<Point | null>(null);

  const j = Math.floor(position / 5);
  const i = position - j * 5;

  const { padding, spacing } = useMemo(
    () => getDimension(boardSize),
    [boardSize]
  );

  useEffect(() => {
    const board = element.current?.parentElement;
    if (board == null) return;
    if (!dragging) return;

    const onDragEnd = (e: UIEvent) => {
      setDragging(false);
      e.preventDefault();
    };

    const onDrag = (e: MouseEvent | DragEvent) => {
      if (dragging) {
        e.preventDefault();
        setMousePos(new Point(e.x, e.y));
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (dragging) {
        e.preventDefault();
        const _e = e.touches.item(0);
        if (_e != null) {
          setMousePos(new Point(_e.clientX, _e.clientY));
        }
      }
    };

    board.addEventListener('mouseup', onDragEnd);
    board.addEventListener('dragend', onDragEnd);
    board.addEventListener('touchend', onDragEnd);

    board.addEventListener('drag', onDrag);
    board.addEventListener('mousemove', onDrag);
    board.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      board.removeEventListener('mouseup', onDragEnd);
      board.removeEventListener('dragend', onDragEnd);
      board.removeEventListener('touchend', onDragEnd);

      board.removeEventListener('drag', onDrag);
      board.removeEventListener('mousemove', onDrag);
      board.removeEventListener('touchmove', onTouchMove);
      setMousePos(null);
    };
  }, [dragging, element.current]);

  if (dragging && mousePos) {
    const parentLeft =
      element.current?.parentElement?.getBoundingClientRect().left;
    const parentTop =
      element.current?.parentElement?.getBoundingClientRect().top;
    const marginLeft =
      mousePos.x - size / 2 - (parentLeft == null ? 0 : parentLeft);
    const marginTop =
      mousePos.y - size / 2 - (parentTop == null ? 0 : parentTop);

    return [marginLeft, marginTop, setDragging];
  } else {
    return [
      padding + i * spacing - size / 2,
      padding + j * spacing - size / 2,
      setDragging,
    ];
  }
}
