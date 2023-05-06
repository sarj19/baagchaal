import { Dispatch, useEffect } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

import { GameStateActions } from '../../common/types';
import useGameContext from '../../reducers/useGameContext';

export default function useInitializeStates(
  stateDispatch: Dispatch<GameStateActions>
) {
  // @ts-ignore
  const loaderData: ResumeGameData = useLoaderData();
  const [gameContext, dispatch] = useGameContext();
  const { state } = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (loaderData == null && state == null) {
      navigate('/');
      return;
    }

    if (state.gameHash == gameContext.gameHash) {
      return;
    }

    switch (loaderData?.gameType || state?.gameType) {
      case 'p2p_internet': {
        dispatch({
          type: 'new_game',
          ...loaderData,
        });
        stateDispatch({ type: 'server', value: loaderData.moves });
        return;
      }
      case 'bot': {
        dispatch({
          type: 'new_game',
          ...state,
        });
        return;
      }
      case 'self': {
        dispatch({
          type: 'new_game',
          ...state,
        });
        return;
      }
      default: {
        console.error('not implemented!');
      }
    }
  }, [loaderData, state]);
}
