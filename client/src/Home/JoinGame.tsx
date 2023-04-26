import '../styles/Home.css';
import '../styles/common.css';

import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '../common/Loading';
import useGameContext from '../reducers/useGameContext';

type State = 'default' | 'loading' | 'error';

export default function JoinGame() {
  const navigate = useNavigate();
  const [gameHash, setgameHash] = useState('');
  const [_, dispatch] = useGameContext();
  const [state, setState] = useState<State>('default');

  const handleInput = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (gameHash.length == 0) return;

    setState('loading');

    // TODO maybe read userId from cookie
    const userId = null;
    axios
      .get('/joingame', { params: { userId, gameHash } })
      .then((res) => {
        if (res.status === 200 && res.data.error == null) {
          console.log('new game', res.data);

          dispatch({ type: 'new_game', gameType: 'p2p_internet', ...res.data });
          dispatch({ type: 'set_opponent', opponentId: res.data.opponentId });
          navigate(`/game/${res.data.gameHash}`);
        } else {
          console.error(res.data.error);
          setState('error');
        }
      })
      .catch((err) => {
        console.error(err);
        setState('error');
      });
  };

  if (state === 'loading') {
    return (
      <div className="joinGameLoading pill">
        <Loading />
      </div>
    );
  } else if (state === 'error') {
    return <div className="joinGameError pill">Error Connecting...</div>;
  } else {
    return (
      <form onSubmit={handleInput} className="gameCodeForm pill">
        <input
          type="text"
          className="gameCodeInput pill"
          placeholder="Enter Code"
          value={gameHash}
          onChange={(event) => {
            setgameHash(event.target.value);
          }}
        />
      </form>
    );
  }
}
