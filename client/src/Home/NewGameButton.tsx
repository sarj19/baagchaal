import '../styles/Home.css';
import '../styles/common.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewGameButton() {
  const navigate = useNavigate();
  return (
    <button className="homeButton pill" onClick={() => navigate('/new')}>
      New Game
    </button>
  );
}
