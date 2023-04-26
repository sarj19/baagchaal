import '../../styles/Game.css';

import React, { ReactElement } from 'react';

import BoardDecor from './BoardDecor';
import BoradPieces from './BoradPieces';

export default function Board({
  boardSize,
}: {
  boardSize: number;
}): ReactElement {
  return (
    <div
      className="boardContainer"
      style={{ width: boardSize, height: boardSize }}
    >
      <BoardDecor width={boardSize} height={boardSize} />
      <BoradPieces boardSize={boardSize} />
    </div>
  );
}
