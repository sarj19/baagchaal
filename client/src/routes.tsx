import axios from 'axios';
import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import { ResumeGameData } from './common/types';
import { GameContainer } from './Game/GameContainer';
import Home from './Home/Home';
import Rules from './Rules/Rules';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home to="home" />,
    },
    {
      path: '/rules',
      element: <Rules />,
    },
    {
      path: '/join',
      element: <Home to="join" />,
    },
    {
      path: '/new',
      element: <Home to="new" />,
    },
    {
      path: '/level',
      element: <Home to="level" />,
    },
    {
      path: '/designate',
      element: <Home to="designate" />,
    },
    {
      path: '/game/self',
      element: <GameContainer />,
    },
    {
      path: '/game/bot',
      element: <GameContainer />,
    },
    {
      path: '/game/:gameHash',
      element: <GameContainer />,
      loader: async (loader): Promise<ResumeGameData | null> => {
        const userId = window.localStorage.getItem('userId');

        if (userId == null) {
          console.error(
            'user identity cannot be verified to join',
            loader.params.ameHash
          );
          throw redirect('/');
        }

        return await axios
          .get('/joingame', {
            params: {
              userId,
              gameHash: loader.params.gameHash,
            },
          })
          .then((res) => {
            if (res.status === 200 && res.data.error == null) {
              console.log('new game', res.data);
              return {
                gameType: 'p2p_internet',
                ...res.data,
              };
            } else {
              console.error(res.data.error);
              return null;
            }
          })
          .catch((err) => {
            console.error(null);
            return null;
          });
      },
    },
  ],
  {
    // for github pages https://github.com/rafgraph/spa-github-pages#usage-instructions
    basename: '/baagchaal',
  }
);
