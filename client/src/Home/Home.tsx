import '../styles/Home.css';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { HomeTitle } from './HomeTitle';
import JoinGame from './JoinGame';
import JoinGameButton from './JoinGameButton';
import NewGameButton from './NewGameButton';
import P2PGameButton from './P2PGameButton';
import PlayWithBot from './PlayWithBot';
import PlayWithYourselfButton from './PlayWithYourselfButton';

type Props = { to: 'new' | 'join' | 'home' };
export default function Home({ to }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    const listener = (e: any) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  if (to === 'new') {
    return (
      <div className="container">
        <HomeTitle />
        <P2PGameButton />
        <PlayWithYourselfButton />
        <PlayWithBot />
      </div>
    );
  }

  if (to === 'join') {
    return (
      <div className="container">
        <HomeTitle />
        <JoinGame />
      </div>
    );
  }

  return (
    <div className="container">
      <HomeTitle />
      <NewGameButton />
      <JoinGameButton />
    </div>
  );
}
