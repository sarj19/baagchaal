import '../styles/Home.css';
import '../styles/common.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function NewGameButton() {
  return (
    <Link to="/new">
      <button className="homeButton pill">New Game</button>
    </Link>
  );
}
