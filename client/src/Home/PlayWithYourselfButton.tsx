import '../styles/Home.css';
import '../styles/common.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import useGameContext from '../reducers/useGameContext';

export default function PlayWithYourselfButton() {
  const navigate = useNavigate();
  const [_, dispatch] = useGameContext();

  const handleClick = () => {
    dispatch({ type: 'new_game', gameType: 'self', designation: 'goat' });
    navigate(`/game/self`);
  };

  return (
    <button className="homeButton pill" onClick={handleClick}>
      Play with yourself
    </button>
  );
}
