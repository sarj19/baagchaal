import { GameState, MAX_GOATS } from '../../common/types';

export function getNumberOfGoatsPlayed(state: GameState): number {
  return Math.min(Math.ceil((state.moves.length) / 2), MAX_GOATS);
}

export function isAllGoatsPlayed(state: GameState): boolean {
  return state.moves.length >= MAX_GOATS * 2;
}
