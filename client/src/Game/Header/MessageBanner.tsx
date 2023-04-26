import '../../styles/GameHeader.css';

import React from 'react';

export default function MessageBanner({ message }: { message: string }) {
  return (
    <div className="messageBanner">
      <div>{message}</div>
    </div>
  );
}
