import { Dispatch, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { GameStateActions } from '../../common/types';
import useGameContext from '../../reducers/useGameContext';

export default function useInitializeStates(
  stateDispatch: Dispatch<GameStateActions>
) {
  // @ts-ignore
  const loaderData: ResumeGameData = useLoaderData();
  const [_, dispatch] = useGameContext();

  useEffect(() => {
    if (loaderData == null) {
      return;
    }

    switch (loaderData.gameType) {
      case 'p2p_internet': {
        dispatch({
          type: 'new_game',
          ...loaderData,
        });
        stateDispatch({ type: 'server', value: loaderData.moves });
        return;
      }
      case 'bot_random':
      case 'bot_scored':
      case 'self': {
        dispatch({
          type: 'new_game',
          ...loaderData,
        });
        return;
      }
      default: {
        console.error('not implemented!');
      }
    }
  }, [loaderData]);
}
