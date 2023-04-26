import '../../styles/GameInfoAndButtons.css';

import React from 'react';

import GoatCounter from './GoatCounter';
import Hint from './Hint';
import LeaveGame from './LeaveGame';
import Options from './Options';
import Rules from './Rules';

export default function GameInfoAndButtons({ fixed }: { fixed: boolean }) {
  return (
    <div
      className={
        fixed
          ? 'gameInfoAndButtonsContainerFixed'
          : 'gameInfoAndButtonsContainer'
      }
    >
      <GoatCounter />
      {fixed && <div />}
      <Hint />
      <Rules />
      <Options />
      <LeaveGame />
    </div>
  );
}
