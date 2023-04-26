import { GameState, PieceType, Position } from '../../common/types';
import { adjancentPositions } from './adjancentPositions';
import { canTigerEatGoat } from './canTigerEatGoat';
import { isAllGoatsPlayed } from './goatsPlayed';

export function getWinner(state: GameState): PieceType | null {
  if (state.getTurn() === "goat" && checkIfGoatLost(state)) {
    return "tiger";
  } else if (state.getTurn() === "tiger" && checkIfTigerLost(state)) {
    return "goat";
  }
  return null;
}

function checkIfTigerLost(state: GameState) {
  // check if tiger has moves
  const tigerHasMoves = Array.from(state.tigers).some((tigerPos) =>
    Array.from(adjancentPositions[tigerPos]).some((adjPos) => {
      // adjacent is not occuppied
      if (!isOccupied(state, adjPos)) {
        return true;
      }
      // adjancet has goat and can be eaten
      if (state.goats.includes(adjPos)) {
        if (
          canTigerEatGoat(state.tigers, state.goats, tigerPos, adjPos) != null
        ) {
          return true;
        }
      }
    })
  );

  return !tigerHasMoves;
}

function checkIfGoatLost(state: GameState) {
  // check if there are no more goats
  if (state.goats.length === 0 && isAllGoatsPlayed(state)) {
    return true;
  }

  // check if goats has moves
  const goatHasMoves = Array.from(state.goats).some((goatPos) =>
    Array.from(adjancentPositions[goatPos]).some((adjPos) => {
      if (!isOccupied(state, adjPos)) {
        return true;
      }
    })
  );

  if (goatHasMoves) {
    return false;
  }

  return isAllGoatsPlayed(state);
}

function isOccupied(state: GameState, position:Position) {
  return state.goats.includes(position) || state.tigers.includes(position);
}
