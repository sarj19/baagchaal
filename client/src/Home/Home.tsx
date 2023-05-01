import '../styles/Home.css';

import React from 'react';

import useEscapeToGoBack from '../common/useEscapeToGoBack';
import { BotLevel } from './BotLevel';
import Designate from './Designate';
import { HomeTitle } from './HomeTitle';
import JoinGame from './JoinGame';
import JoinGameButton from './JoinGameButton';
import NewGameButton from './NewGameButton';
import P2PGameButton from './P2PGameButton';
import PlayWithBot from './PlayWithBot';
import PlayWithYourselfButton from './PlayWithYourselfButton';

type Props = { to: 'new' | 'join' | 'home' | 'level' | 'designate' };
export default function Home({ to }: Props) {
  useEscapeToGoBack();

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

  if (to === 'designate') {
    return (
      <div className="container">
        <HomeTitle />
        <Designate designation="goat" />
        <Designate designation="tiger" />
        <Designate designation="random" />
      </div>
    );
  }

  if (to === 'level') {
    return (
      <div className="container">
        <HomeTitle />
        <div className="pill selectLevel">Select Level</div>
        <div className="levels">
          <BotLevel level={0} />
          <BotLevel level={1} />
          <BotLevel level={2} />
          <BotLevel level={3} />
          <BotLevel level={4} />
          <BotLevel level={5} />
        </div>
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
