import '../../styles/common.css';

import React from 'react';

import useGameContext from '../../reducers/useGameContext';
import leaveIcon from './leaveIcon.png';

export default function LeaveGameButton({ fixed }: { fixed: boolean }) {
  const dispatch = useGameContext()[1];
  return (
    <button
      className="pill"
      onClick={() => {
        dispatch({ type: 'leave_game', value: true });
      }}
    >
      {fixed ? <img src={leaveIcon} /> : 'Leave Game'}
    </button>
  );
}
