import React from 'react';

import { GameOver } from './GameOver';
import LeaveGame from './LeaveGame';

export function BoardOverlay() {
  return (
    <>
      <GameOver />
      <LeaveGame />
    </>
  );
}
