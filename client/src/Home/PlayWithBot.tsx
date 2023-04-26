import '../styles/Home.css';
import '../styles/common.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import useGameContext from '../reducers/useGameContext';

export default function PlayWithBot() {
  const navigate = useNavigate();
  const [_, dispatch] = useGameContext();

  const handleClick = () => {
    dispatch({ type: 'new_game', gameType: 'bot_random', designation: 'goat' });
    navigate(`/game/bot`);
  };

  return (
    <button className="homeButton pill" onClick={handleClick}>
      Play with bot
    </button>
  );
}
