import { GameState, Move } from '../../common/types';
import { adjancentPositions } from './adjancentPositions';
import { canTigerEatGoat } from './canTigerEatGoat';
import { getAllEmptySpaces } from './getAllEmptySpaces';
import { isAllGoatsPlayed } from './goatsPlayed';
import { isEmptySpace } from './isEmptySpace';

export function getPossibleMovesForTiger({ tigers, goats }: GameState): Move[] {
  const possibleMoves: Move[] = [];
  tigers.forEach((from) => {
    adjancentPositions[from].forEach((to) => {
      if (
        isEmptySpace(to, goats, tigers) ||
        canTigerEatGoat(tigers, goats, from, to)
      ) {
        possibleMoves.push([from, to]);
      }
    });
  });

  return possibleMoves;
}

export function getPossibleMovesForGoat(state: GameState): Move[] {
  if (isAllGoatsPlayed(state)) {
    const possibleMoves: Move[] = [];
    state.goats.forEach((from) => {
      adjancentPositions[from].forEach((to) => {
        if (isEmptySpace(to, state.goats, state.tigers)) {
          possibleMoves.push([from, to]);
        }
      });
    });
    return possibleMoves;
  } else {
    return getAllEmptySpaces(state.tigers, state.goats).map((p) => [p, p]);
  }
}
