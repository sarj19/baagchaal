import React, { useEffect } from 'react';

import Point from '../../common/Point';
import useCanvasRef from '../utils/useCanvasRef';

const length = 2 * Math.PI;

export default function Circle({
  center,
  radius,
}: {
  center: Point | null;
  radius: number;
}) {
  let canvasRef = useCanvasRef();

  useEffect(() => {
    if (center == null) {
      return;
    }

    const canvas = canvasRef!.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, length);
    ctx.fillStyle = "red";
    ctx.fill();
  }, [canvasRef, center, radius]);
}
