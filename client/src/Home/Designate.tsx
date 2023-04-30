import '../styles/Home.css';
import '../styles/common.css';

import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { PieceType } from '../common/types';

export default function Designate({ designation }: { designation: PieceType }) {
  const { state } = useLocation();

  if (state?.gameType == null) {
    return <Navigate to="/" replace={true} />;
  }

  let destination;
  switch (state?.gameType) {
    case 'bot': {
      destination = '/game/bot';
      break;
    }
    default: {
      console.error('not implemented');
      throw new Error('not implemented');
    }
  }

  return (
    <Link to={destination} state={{ ...state, designation }} replace={true}>
      <button className="homeButton pill">{designation}</button>
    </Link>
  );
}
