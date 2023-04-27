import '../../styles/Game.css';

import React, { ReactElement } from 'react';

import useGameContext from '../../reducers/useGameContext';
import BoardDecor from './BoardDecor';
import BoradPieces from './BoradPieces';
import { DebugPieceOverlay } from './DebugPieceOverlay';

export default function Board({
  boardSize,
}: {
  boardSize: number;
}): ReactElement {
  const { debug } = useGameContext()[0];
  return (
    <div
      className="boardContainer"
      style={{ width: boardSize, height: boardSize }}
    >
      <BoardDecor width={boardSize} height={boardSize} />
      <BoradPieces boardSize={boardSize} />
      {debug && <DebugPieceOverlay boardSize={boardSize} />}
    </div>
  );
}
