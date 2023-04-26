import { GameState, Move, PieceType } from '../../common/types';
import { gameStateReducer } from '../reducers/gameStateReducer';
import { adjancentPositions } from './adjancentPositions';
import { canTigerEatGoat } from './canTigerEatGoat';

export function getRandomMove(possibleMoves: Move[]): Move | null {
  if (possibleMoves.length == 0) return null;

  const moveIndex = Math.floor(Math.random() * possibleMoves.length);
  return possibleMoves[moveIndex];
}

export function getScoredMove(
  state: GameState,
  possibleMoves: Move[],
  forPiece: PieceType
): Move | null {
  if (possibleMoves.length == 0) return null;

  if (forPiece == "goat") {
    return getScoredMoveForGoat(state, possibleMoves);
  } else {
    return getScoredMoveForTiger(state, possibleMoves);
  }
}

function getScoredMoveForTiger(state: GameState, possibleMoves: Move[]): Move {
  const scores = getTigerFavoredScore(state, possibleMoves);

  let maxScore = scores[0];
  let possibleMove = possibleMoves[0];
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > maxScore) {
      possibleMove = possibleMoves[i];
      maxScore = scores[i];
    }
  }

  return possibleMove;
}

function getScoredMoveForGoat(state: GameState, possibleMoves: Move[]): Move {
  // CANT USE NEGATIVE SCORE, BECAUSE FROM AND TO IS FOR TIGER, NOT GOAT
  const scores = getTigerFavoredScore(state, possibleMoves);

  let minScore = scores[0];
  let possibleMove = possibleMoves[0];
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] < minScore) {
      possibleMove = possibleMoves[i];
      minScore = scores[i];
    }
  }

  return possibleMove;
}

//   const LOOK_FORWARD = 2; // look forward 2 steps
// calculat 2nd step, and use max of that as well. (extend it to nth step)
// for 2nd and more step, have to anticipate goat step as well
// can get blocked in next step = -10
// can unblock another tiger +5
// number of empty spaces around , score +1 == number of empty space around
// for each goat it prevents tiger from eating, score -5
// run away from being eaten, -5
// if it blocks tiger, -10
function getTigerFavoredScore(
  state: GameState,
  possibleMoves: Move[]
): number[] {
  // can move +0
  const scores = new Array(possibleMoves.length).fill(0);

  possibleMoves.forEach(([from, to], index) => {
    // check if it is goat eatable +10
    if (state.goats.includes(to)) {
      if (canTigerEatGoat(state.tigers, state.goats, from, to)) {
        scores[index] += 10;
      }
    }

    // calculate mockState after moving
    const mockState = gameStateReducer(state, {
      type: "move_directly",
      from,
      to,
    });

    adjancentPositions[to].forEach((pos) => {
      if (pos == from) return;

      // eat goat in next step +1
      if (state.goats.includes(pos)) {
        if (canTigerEatGoat(mockState.tigers, mockState.goats, to, pos)) {
          scores[index] += 1;
        }
      }

      // tiger adjacent after moving -1
      if (state.tigers.includes(pos)) {
        scores[index] -= 1;
      }
    });
  });

  return scores;
}
