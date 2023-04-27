import { GameState, Move, PieceType } from '../../common/types';
import { gameStateReducer } from '../reducers/gameStateReducer';
import { adjancentPositions } from './adjancentPositions';
import { canTigerEatGoat } from './canTigerEatGoat';
import { isEmptySpace } from './isEmptySpace';
import { getPossibleMovesForTiger, getPossibleMovesForTigers } from './possibleMoves';

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

  const scores =
    forPiece == 'goat'
      ? getGoatFavoredScores(state, possibleMoves)
      : getTigerFavoredScores(state, possibleMoves);

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

export function getTigerFavoredScores(
  state: GameState,
  possibleMoves: Move[],
  lookForward: number = 0
): number[] {
  return possibleMoves.map((possibleMove, index) =>
    getTigerFavoredScore(state, possibleMove, lookForward)
  );
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
function getTigerFavoredScore(
  state: GameState,
  possibleMove: Move,
  lookForward = 0
): number {
  // can move +0
  let score = 0;
  const [from, to] = possibleMove;
  // check if it is goat eatable +25
  if (state.goats.includes(to)) {
    if (canTigerEatGoat(state.tigers, state.goats, from, to)) {
      score += 25;
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
  score += mockPossibleMoves.length - 3;

  adjancentPositions[to].forEach((pos) => {
    if (pos == from) return;

    // eat goat in next step +10
    if (state.goats.includes(pos)) {
      if (canTigerEatGoat(mockState.tigers, mockState.goats, to, pos)) {
        score += 10;
      }
    }

    // tiger adjacent after moving -2
    if (state.tigers.includes(pos)) {
      score -= 2;
    }
  });

  // calculate total score after next move, 1% of total
  if (lookForward < MAX_LOOK_FORWARD) {
    const scores = getTigerFavoredScores(
      mockState,
      mockPossibleMoves,
      lookForward + 1
    );
    const lookForwardScore = scores.reduce(
      (partialSum, a) => Math.max(partialSum, a),
      scores[0]
    );

    score += Math.floor(0.01 * lookForwardScore);
  }
  return score;
}

export function getGoatFavoredScores(
  state: GameState,
  possibleMoves: Move[],
  lookForward: number = 0
): number[] {
  return possibleMoves.map((possibleMove, index) =>
    getGoatFavoredScore(state, possibleMove, lookForward)
  );
}

// position with each empty line of attack is -1
// tiger can immediately eat next, -10
// blocks other goat to be eaten +10
// MOVE should be separate from place?
// open space for tiger to eat other piece
export function getGoatFavoredScore(
  state: GameState,
  [from, to]: Move,
  lookForward = 0
): number {
  let score = 0;
  adjancentPositions[to].forEach((pos) => {
    // position with each empty line of attack is -2
    if (isEmptySpace(pos, state.goats, state.tigers)) {
      if (canTigerEatGoat(state.tigers, state.goats, pos, to)) {
        score -= 2;
      }
    }

    // calculate mockState after moving
    const mockState = gameStateReducer(state, {
      type: 'move_directly',
      from,
      to,
    });
    const mockPossibleMoves = getPossibleMovesForTigers(mockState);

    // tiger can eat after move
    mockPossibleMoves
      .filter((move) => move[1] == to)
      .forEach((move) => {
        if (
          canTigerEatGoat(mockState.tigers, mockState.goats, move[0], move[1])
        ) {
          score -= 10;
        }
      });
  });

  return score;
}
