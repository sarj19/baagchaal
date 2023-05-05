import React, { forwardRef } from 'react';

import tiger from './tiger.svg';

type Props = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  'src'
>;

const Tiger = forwardRef<HTMLImageElement, Props>((props, ref) => {
  return <img src={tiger} ref={ref} {...props} />;
});

export default Tiger;
