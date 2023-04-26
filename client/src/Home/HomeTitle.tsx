import '../styles/Home.css';

import React from 'react';

import Tiger from '../common/Tiger';

export function HomeTitle() {
  return (
    <div>
      <Tiger width={64} height={64} />
      <div className="title"> BaagChaal</div>
    </div>
  );
}
