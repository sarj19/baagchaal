import '../../styles/common.css';
import '../../styles/GameHeader.css';

import React from 'react';

import Goat from '../../common/Goat';
import Highlight from '../../common/Highlight';
import Tiger from '../../common/Tiger';
import useGameContext from '../../reducers/useGameContext';
import useGameState from '../reducers/useGameState';
import { isTurn } from '../utils/turn';

const IMG_SIZE = 60;

export default function Turn() {
  const [state, _] = useGameState();
  const [{ designation, gameType }, __] = useGameContext();

  const tiger =
    designation === 'tiger' && gameType !== 'self' ? 'You' : 'Tiger';
  const goat = designation === 'goat' && gameType !== 'self' ? 'You' : 'Goat';

  if (isTurn(state, 'tiger')) {
    return (
      <>
        <div className="hasturn">
          <div>{tiger}</div>
          <Highlight
            element={
              <Tiger
                style={{
                  marginLeft: 0,
                  marginTop: 0,
                  height: IMG_SIZE,
                  width: IMG_SIZE,
                }}
              />
            }
          />
        </div>
        <div className="notaturn">
          <Goat height={IMG_SIZE} />
          <div>{goat}</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="notaturn">
          <div>{tiger}</div>
          <Tiger height={IMG_SIZE} />
        </div>
        <div className="hasturn">
          <Highlight
            element={
              <Goat
                style={{
                  marginLeft: -IMG_SIZE,
                  marginTop: 0,
                  height: IMG_SIZE,
                  width: IMG_SIZE,
                }}
              />
            }
          />
          <div>{goat}</div>
        </div>
      </>
    );
  }
}
