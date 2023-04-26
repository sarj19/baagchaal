import '../../styles/GameHeader.css';

import React from 'react';

import { Loading } from '../../common/Loading';

export default function WaitingForOtherPlayer() {
  return (
    <div className="messageBanner">
      <div>Waiting for the other player</div>
      <Loading />
    </div>
  );
}
