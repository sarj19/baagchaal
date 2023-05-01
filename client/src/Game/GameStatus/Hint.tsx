import '../../styles/common.css';

import React from 'react';

import useGameContext from '../../reducers/useGameContext';
import hintIcon from './hintIcon.png';

export default function Hint({ fixed }: { fixed: boolean }) {
  const [state, dispatch] = useGameContext();
  return (
    <button
      className={state.hint ? 'pill activePill' : 'pill'}
      onClick={() => dispatch({ type: state.hint ? 'nohint' : 'hint' })}
    >
      {fixed ? <img src={hintIcon} /> : 'Hint'}
    </button>
  );
}
