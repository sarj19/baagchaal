import React, { ReactElement } from 'react';

const HIGHLIGHT_SIZE = 5;
type Props = { element: ReactElement };
export default function Ghosted({ element }: Props) {
  return React.cloneElement(element, {
    style: {
      ...element.props.style,
      marginLeft: element.props.style.marginLeft - HIGHLIGHT_SIZE,
      marginTop: element.props.style.marginTop - HIGHLIGHT_SIZE,
      width: element.props.style.width + HIGHLIGHT_SIZE * 2,
      height: element.props.style.height + HIGHLIGHT_SIZE * 2,
      filter: "opacity(0.4) blur(2px) grayscale(1)",
    },
  });
}
