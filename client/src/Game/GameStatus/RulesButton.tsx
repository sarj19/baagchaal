import '../../styles/common.css';
import '../../styles/GameInfoAndButtons.css';

import React from 'react';
import { Link } from 'react-router-dom';

import rulesIcon from './rulesIcon.png';

export default function RulesButton({ fixed }: { fixed: boolean }) {
  return (
    <Link to="/game/rules" className="pill rulesButton">
      {fixed ? <img alt="rules" src={rulesIcon} /> : 'Rules'}
    </Link>
  );
}
