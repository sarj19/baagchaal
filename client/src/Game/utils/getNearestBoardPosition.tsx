import { Position } from '../../common/types';
import getDimension from './getDimension';

export default function getNearestBoardPosition(
  clientX: number,
  clientY: number,
  board: HTMLDivElement
): Position | null {
  const { padding, spacing } = getDimension(
    Math.min(
      board.getBoundingClientRect().width,
      board.getBoundingClientRect().height
    )
  );
  const clickTolerance = spacing * 0.48 * (spacing * 0.48);

  const x = clientX - board.offsetLeft;
  const y = clientY - board.offsetTop;

  const i = Math.round((x - (x % spacing)) / spacing);
  const j = Math.round((y - (y % spacing)) / spacing);

  const actualX = padding + i * spacing;
  const actualY = padding + j * spacing;
  const distance =
    (actualX - x) * (actualX - x) + (actualY - y) * (actualY - y);
  const closeEnough = distance < clickTolerance;

  if (closeEnough) {
    // @ts-ignore
    return j * 5 + i;
  } else {
    return null;
  }
}
