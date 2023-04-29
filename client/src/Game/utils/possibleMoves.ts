import { GameState, Move, Position } from '../../common/types';
import { canTigerEatGoat } from './canTigerEatGoat';
import { isAllGoatsPlayed } from './goats';
import { adjancentPositions, getAllEmptySpaces, isEmptySpace } from './validPositions';

export function getPossibleMovesForTigers({
  tigers,
  goats,
}: GameState): Move[] {
  const possibleMoves: Move[] = [];
  tigers.forEach((from) => {
    possibleMoves.push(...getPossibleMovesForTiger(from, tigers, goats));
  });
  return possibleMoves;
}

export function getPossibleMovesForTiger(
  from: Position,
  tigers: Position[],
  goats: Position[]
): Move[] {
  const possibleMoves: Move[] = [];
  adjancentPositions[from].forEach((to) => {
    if (tigers.includes(to)) return;
    if (
      isEmptySpace(to, goats, tigers) ||
      canTigerEatGoat(tigers, goats, from, to) != null
    ) {
      possibleMoves.push([from, to]);
    }
  });
  return possibleMoves;
}

export function getPossibleMovesForGoats(state: GameState): Move[] {
  if (isAllGoatsPlayed(state)) {
    const possibleMoves: Move[] = [];
    state.goats.forEach((from) => {
      possibleMoves.push(...getPossibleMovesForGoat(from, state));
    });
    return possibleMoves;
  } else {
    return getAllEmptySpaces(state.tigers, state.goats).map((p) => [p, p]);
  }
}

export function getPossibleMovesForGoat(
  from: Position,
  state: GameState
): Move[] {
  const possibleMoves: Move[] = [];
  adjancentPositions[from].forEach((to) => {
    if (isEmptySpace(to, state.goats, state.tigers)) {
      possibleMoves.push([from, to]);
    }
  });
  return possibleMoves;
}
