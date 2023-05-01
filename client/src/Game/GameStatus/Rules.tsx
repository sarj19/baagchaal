import '../../styles/common.css';

import React from 'react';

import rulesIcon from './rulesIcon.png';

export default function Rules({ fixed }: { fixed: boolean }) {
  return (
    <button className="pill" disabled={true}>
      {fixed ? <img src={rulesIcon} /> : 'Rules'}
    </button>
  );
}
