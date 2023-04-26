import '../styles/Home.css';
import '../styles/common.css';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '../common/Loading';
import useGameContext from '../reducers/useGameContext';

type State = 'loading' | 'error' | 'default';

export default function NewGameButton() {
  const navigate = useNavigate();
  const [state, setState] = useState('default');
  const [_, dispatch] = useGameContext();

  const handleClick = () => {
    setState('loading');
    // TODO allow selecting designation
    const designation = 'goat';
    // TODO maybe read userId from cookie
    const userId = null;
    axios
      .get('/newgame', { params: { designation, userId } })
      .then((res) => {
        if (res.status === 200 && res.data.error == null) {
          console.log('new game', res.data);

          // TODO check error message
          dispatch({ type: 'new_game', gameType: 'p2p_internet', ...res.data });
          navigate(`/game/${res.data.gameHash}`);
        } else {
          console.log(res.data.error);
          setState('error');
        }
      })
      .catch((err) => {
        setState('error');
      });
  };

  let content = <>Play Online</>;
  if (state === 'loading') {
    content = <Loading />;
  } else if (state === 'error') {
    content = <>Error connecting...</>;
  }
  return (
    <button
      className="homeButton pill"
      onClick={handleClick}
      disabled={true} //state !== "default"}
    >
      {content}
    </button>
  );
}
