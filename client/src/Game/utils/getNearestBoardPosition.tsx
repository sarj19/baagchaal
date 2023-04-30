import { Position } from '../../common/types';
import getDimension from './getDimension';

export default function getNearestBoardPosition(
  e: MouseEvent,
  image: HTMLImageElement
): Position | null {
  const { padding, spacing } = getDimension(
    Math.min(image.width, image.height)
  );
  const clickTolerance = spacing * 0.25 * (spacing * 0.25);

  const x = e.clientX - image.offsetLeft;
  const y = e.clientY - image.offsetTop;

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
