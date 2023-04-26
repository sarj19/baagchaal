import { createContext, Dispatch, useContext } from 'react';

import { GameContext, GameContextActions } from '../common/types';

export type GameContextReducer = [GameContext, Dispatch<GameContextActions>];

export const GameContextContext = createContext<GameContextReducer | null>(
  null
);

export default function useGameContext(): GameContextReducer {
  return useContext(GameContextContext)!;
}
