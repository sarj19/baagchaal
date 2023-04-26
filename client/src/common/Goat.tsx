import React from 'react';

import goat from './goat.svg';

type Props = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  'src'
>;

export default function Goat(props: Props) {
  return <img src={goat} {...props} />;
}
