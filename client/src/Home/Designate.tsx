import '../styles/Home.css';
import '../styles/common.css';

import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import Goat from '../common/Goat';
import Tiger from '../common/Tiger';
import { PieceType } from '../common/types';

const style = { height: 50, filter: 'drop-shadow(0px 0px 12px red)' };
export default function Designate({
  designation,
}: {
  designation: PieceType | 'random';
}) {
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

  let button;
  switch (designation) {
    case 'tiger': {
      button = <Tiger style={style} />;
      break;
    }
    case 'goat': {
      button = <Goat style={style} />;
      break;
    }
    case 'random': {
      button = <div style={{ ...style, fontSize: 40 }}>🎰</div>;
      break;
    }
  }

  return (
    <Link
      to={destination}
      state={{
        ...state,
        designation:
          designation == 'random'
            ? Math.random() < 0.5
              ? 'goat'
              : 'tiger'
            : designation,
      }}
      replace={true}
      className="designation pill"
    >
      {button}
    </Link>
  );
}
