import { GameState, Move, PieceType } from '../../common/types';
import { gameStateReducer } from '../reducers/gameStateReducer';
import { adjancentPositions } from './adjancentPositions';
import { canTigerEatGoat } from './canTigerEatGoat';
import { getPossibleMovesForTiger } from './possibleMoves';

// don't go above 2, calculations are exponential so will freeze browser
const MAX_LOOK_FORWARD = 1;

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

  if (forPiece == 'goat') {
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
// eating goat is blocked by another tiger ---> T - G - T
export function getTigerFavoredScore(
  state: GameState,
  possibleMoves: Move[],
  lookForward: number = 0
): number[] {
  // can move +0
  const scores = new Array(possibleMoves.length).fill(0);

  possibleMoves.forEach(([from, to], index) => {
    // check if it is goat eatable +25
    if (state.goats.includes(to)) {
      if (canTigerEatGoat(state.tigers, state.goats, from, to)) {
        scores[index] += 25;
      }
    }

    // calculate mockState after moving
    const mockState = gameStateReducer(state, {
      type: 'move_directly',
      from,
      to,
    });
    const mockPossibleMoves = getPossibleMovesForTiger(
      to,
      mockState.tigers,
      mockState.goats
    );

    // moves allowed after moving , +5 for 8 possibilities,... -3 for 0 possibility
    scores[index] += mockPossibleMoves.length - 3;

    adjancentPositions[to].forEach((pos) => {
      if (pos == from) return;

      // eat goat in next step +10
      if (state.goats.includes(pos)) {
        if (canTigerEatGoat(mockState.tigers, mockState.goats, to, pos)) {
          scores[index] += 10;
        }
      }

      // tiger adjacent after moving -2
      if (state.tigers.includes(pos)) {
        scores[index] -= 2;
      }
    });

    // calculate total score after next move, 1% of total
    if (lookForward < MAX_LOOK_FORWARD) {
      const scores = getTigerFavoredScore(
        mockState,
        mockPossibleMoves,
        lookForward + 1
      );
      const score = scores.reduce(
        (partialSum, a) => Math.max(partialSum, a),
        scores[0]
      );

      scores[index] += Math.floor(0.01 * score);
    }
  });

  return scores;
}
