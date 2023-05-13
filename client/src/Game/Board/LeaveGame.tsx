import '../../styles/BoardOverlay.css';

import React from 'react';
import { Link } from 'react-router-dom';

import useGameContext from '../../reducers/useGameContext';

export default function LeaveGame() {
  const [{ showLeaveGame }, dispatch] = useGameContext();

  if (!showLeaveGame) {
    return <></>;
  }

  return (
    <div className="boardOverlayContainer">
      <div>Are you sure?</div>
      <Link to="/" replace={true} className="pill leaveGameConfirmation">
        Yes
      </Link>
      <a
        className="pill leaveGameConfirmation"
        onClick={() => {
          dispatch({ type: 'leave_game', value: false });
        }}
      >
        No
      </a>
    </div>
  );
}
