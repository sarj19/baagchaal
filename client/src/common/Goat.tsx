import React, { forwardRef } from 'react';

import goat from './goat.svg';

type Props = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  'src'
>;

const Goat = forwardRef<HTMLImageElement, Props>((props, ref) => {
  return <img src={goat} ref={ref} {...props} />;
});

export default Goat;
