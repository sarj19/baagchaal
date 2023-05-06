import '../styles/Home.css';
import '../styles/common.css';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PlayWithBot() {
  const { state } = useLocation();
  return (
    <Link to={'/level'} state={{ ...state, gameHash: new Date().getTime() }}>
      <button className="homeButton pill">Play with bot</button>
    </Link>
  );
}
