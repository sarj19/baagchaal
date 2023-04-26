import React, { ReactElement } from 'react';

const HIGHLIGHT_SIZE = 5;
type Props = { element: ReactElement };
export default function Highlight({ element }: Props) {
  return React.cloneElement(element, {
    style: {
      ...element.props.style,
      marginLeft: element.props.style.marginLeft - HIGHLIGHT_SIZE,
      marginTop: element.props.style.marginTop - HIGHLIGHT_SIZE,
      width: element.props.style.width + HIGHLIGHT_SIZE * 2,
      height: element.props.style.height + HIGHLIGHT_SIZE * 2,
      filter: 'drop-shadow(0px 0px 12px yellow)',
    },
  });
}
