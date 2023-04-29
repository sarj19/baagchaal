import React, { ReactElement, useMemo } from 'react';

import Ghosted from '../../common/Ghosted';
import Goat from '../../common/Goat';
import Highlight from '../../common/Highlight';
import getDimension from '../utils/getDimension';

type Props = {
  boardSize: number;
  position: number;
  selected: boolean;
  type: 'highlight' | 'gray' | 'default';
  onClick: () => void;
};
export default function GoatPiece({
  boardSize,
  position,
  selected,
  type,
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
    <Goat
      onClick={onClick}
      style={{
        marginLeft: x - size / 2,
        marginTop: y - size / 2,
        width: size,
        height: size,
      }}
    />
  );

  if (type === 'highlight') {
    return <Highlight element={element} />;
  } else if (type === 'gray') {
    return <Ghosted element={element} />;
  }

  return element;
}
