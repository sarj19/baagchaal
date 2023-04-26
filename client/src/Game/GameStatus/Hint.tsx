import '../../styles/common.css';

import React from 'react';

import useGameContext from '../../reducers/useGameContext';

export default function Hint() {
  const [state, dispatch] = useGameContext();
  return (
    <button
      className={state.hint ? 'pill activePill' : 'pill'}
      onClick={() => dispatch({ type: state.hint ? 'nohint' : 'hint' })}
    >
      Hint
    </button>
  );
}
