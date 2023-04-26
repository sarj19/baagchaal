import { createContext, Dispatch, useContext } from 'react';

import { GameState, GameStateActions } from '../../common/types';

export type GameStateContextReducer = [GameState, Dispatch<GameStateActions>];

export const GameStateContext = createContext<GameStateContextReducer | null>(
  null
);

export default function useGameState(): GameStateContextReducer {
  return useContext(GameStateContext)!;
}
