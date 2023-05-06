import '../../styles/common.css';

import React from 'react';

import settingsIcon from './settingsIcon.png';

export default function Options({ fixed }: { fixed: boolean }) {
  return (
    <button className="pill" disabled={true}>
      {fixed ? <img alt="options" src={settingsIcon} /> : 'Options'}
    </button>
  );
}
