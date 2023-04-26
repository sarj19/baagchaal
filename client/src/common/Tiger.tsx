import React from 'react';

import tiger from './tiger.svg';

type Props = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  'src'
>;

export default function Tiger(props: Props) {
  return <img src={tiger} {...props} />;
}
