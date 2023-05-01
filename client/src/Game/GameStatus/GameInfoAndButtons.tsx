import '../../styles/GameInfoAndButtons.css';

import React from 'react';

import GoatCounter from './GoatCounter';
import Hint from './Hint';
import LeaveGameButton from './LeaveGameButton';
import Options from './Options';
import Replay from './Replay';
import RulesButton from './RulesButton';

export default function GameInfoAndButtons({ fixed }: { fixed: boolean }) {
  return (
    <>
      {fixed && <GoatCounter />}
      <div
        className={
          fixed
            ? 'gameInfoAndButtonsContainerFixed'
            : 'gameInfoAndButtonsContainer'
        }
      >
        {!fixed && <GoatCounter />}
        <Hint fixed={fixed} />
        <RulesButton fixed={fixed} />
        <Options fixed={fixed} />
        <Replay fixed={fixed} />
        <LeaveGameButton fixed={fixed} />
      </div>
    </>
  );
}
