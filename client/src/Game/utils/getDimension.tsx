export type Dimension = {
  padding: number;
  spacing: number;
  start: number;
  end: number;
  midPoint: number;
};

export default function getDimension(canvasSize: number): Dimension {
  const padding = canvasSize / 10,
    boardWidth = canvasSize - padding * 2,
    spacing = boardWidth / 4;
  const start = padding,
    end = canvasSize - padding;
  const midPoint = (start + end) / 2;

  return { padding, spacing, start, end, midPoint };
}
