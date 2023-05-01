import '../../styles/common.css';

import React from 'react';

import replayIcon from './replayIcon.png';

export default function Replay({ fixed }: { fixed: boolean }) {
  return (
    <button className="pill" disabled={true}>
      {fixed ? <img src={replayIcon} /> : 'Replay'}
    </button>
  );
}
