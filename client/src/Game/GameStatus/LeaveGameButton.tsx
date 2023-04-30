import '../../styles/common.css';

import React from 'react';

import useGameContext from '../../reducers/useGameContext';

export default function LeaveGameButton() {
  const dispatch = useGameContext()[1];
  return (
    <button
      className="pill"
      onClick={() => {
        dispatch({ type: 'leave_game', value: true });
      }}
    >
      Leave Game
    </button>
  );
}
