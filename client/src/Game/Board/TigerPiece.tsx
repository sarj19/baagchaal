import React, { ReactElement, useMemo } from 'react';

import Highlight from '../../common/Highlight';
import Tiger from '../../common/Tiger';
import getDimension from '../utils/getDimension';

type Props = {
  boardSize: number;
  position: number;
  selected: boolean;
  highlight: boolean;
  onClick: () => void;
};

export default function TigerPiece({
  boardSize,
  position,
  selected,
  highlight,
  onClick,
}: Props): ReactElement {
  const size = selected ? 90 : 70;

  const j = Math.floor(position / 5);
  const i = position - j * 5;

  const { padding, spacing } = useMemo(
    () => getDimension(boardSize),
    [boardSize]
  );

  const x = padding + i * spacing;
  const y = padding + j * spacing;

  const element = (
    <Tiger
      onClick={onClick}
      style={{
        marginLeft: x - size / 2,
        marginTop: y - size / 2,
        width: size,
        height: size,
      }}
    />
  );

  return highlight ? <Highlight element={element} /> : element;
}
