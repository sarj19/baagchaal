import Point from '../../common/Point';
import getDimension from './getDimension';

export default function getPositionToPoint(
  canvas: HTMLCanvasElement,
  position: number
) {
  const j = Math.floor(position / 5);
  const i = position - j * 5;

  const { padding, spacing } = getDimension(
    Math.min(canvas.width, canvas.height)
  );
  const x = padding + i * spacing;
  const y = padding + j * spacing;
  return new Point(x, y);
}
