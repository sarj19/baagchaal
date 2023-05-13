import '../styles/Home.css';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function BotLevel({ level }: { level: number }) {
  const { state } = useLocation();
  return (
    <Link
      to={"/designate"}
      replace={true}
      state={{ ...state, gameType: "bot", botLevel: level }}
    >
      <button className="levelButton pill">{level}</button>
    </Link>
  );
}
