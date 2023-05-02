import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import Point from '../../common/Point';
import { Position } from '../../common/types';
import getDimension from '../utils/getDimension';

export function useDraggablePiece(
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
    if (!dragging) return;
    const onDragEnd = (e: UIEvent) => {
      setDragging(false);
      e.preventDefault();
    };
    const onDrag = (e: MouseEvent | DragEvent | TouchEvent) => {
      if (dragging) {
        if (e instanceof TouchEvent) {
          const _e = e.touches.item(0);
          if (_e != null) {
            setMousePos(new Point(_e.clientX, _e.clientY));
          }
        } else {
          setMousePos(new Point(e.x, e.y));
        }
      }
    };

    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('dragend', onDragEnd);
    document.addEventListener('touchend', onDragEnd);

    document.addEventListener('drag', onDrag);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag);

    return () => {
      document.removeEventListener('mouseup', onDragEnd);
      document.removeEventListener('dragend', onDragEnd);
      document.removeEventListener('touchend', onDragEnd);

      document.removeEventListener('drag', onDrag);
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('touchmove', onDrag);
      setMousePos(null);
    };
  }, [dragging]);

  const marginLeft =
    dragging && mousePos ? mousePos.x - size : padding + i * spacing - size / 2;
  const marginTop =
    dragging && mousePos ? mousePos.y - size : padding + j * spacing - size / 2;

  return [marginLeft, marginTop, setDragging];
}
