import '../styles/Home.css';
import '../styles/common.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function PlayWithYourselfButton() {
  return (
    <Link
      to="/game/self"
      state={{
        type: 'new_game',
        gameType: 'self',
        designation: 'goat',
        gameHash: new Date().getTime(),
      }}
    >
      <button className="homeButton pill">Play with yourself</button>
    </Link>
  );
}
