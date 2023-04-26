import React, { ReactElement, useEffect } from 'react';

import getDimension, { Dimension } from '../utils/getDimension';
import useCanvasRef from '../utils/useCanvasRef';

export default function BoardGrid(): ReactElement {
  const canvasRef = useCanvasRef();

  useEffect(() => {
    const canvas = canvasRef!.current!;
    const ctx = canvas.getContext('2d')!;
    drawBoard(ctx, getDimension(Math.min(canvas.width, canvas.height)));
  });

  return <></>;
}

function drawBoard(
  ctx: CanvasRenderingContext2D,
  { spacing, start, end, midPoint }: Dimension
) {
  ctx.beginPath();

  for (let i = 0; i < 5; i++) {
    // horizontal lines
    drawLine(ctx, start + spacing * i, start, start + spacing * i, end);
    //vertical lines
    drawLine(ctx, start, start + spacing * i, end, start + spacing * i);
  }

  // draw forward slash diagonal
  drawLine(ctx, start, midPoint, midPoint, start);
  drawLine(ctx, start, end, end, start);
  drawLine(ctx, midPoint, end, end, midPoint);

  // draw backward slash diagonal
  drawLine(ctx, midPoint, start, end, midPoint);
  drawLine(ctx, start, start, end, end);
  drawLine(ctx, start, midPoint, midPoint, end);

  ctx.stroke();
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number
) {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
}
