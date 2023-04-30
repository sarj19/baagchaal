import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function BotLevel({ level }: { level: number }) {
  const { state } = useLocation();
  return (
    <Link
      to={'/designate'}
      state={{ ...state, gameType: 'bot', botLevel: level }}
    >
      <button className="homeButton pill">Level {level}</button>
    </Link>
  );
}
