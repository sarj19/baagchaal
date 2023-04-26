import '../styles/Home.css';
import '../styles/common.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinGameButton() {
  const navigate = useNavigate();
  return (
    <button className="homeButton pill" onClick={() => navigate("/join")} disabled={true}>
      Join Game
    </button>
  );
}
