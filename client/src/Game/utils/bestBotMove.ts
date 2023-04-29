import { GameState, MAX_GOATS, Move } from '../../common/types';
import { gameStateReducer } from '../reducers/gameStateReducer';
import { getNumberOfGoatsPlayed, isAllGoatsPlayed } from './goats';
import {
    getPossibleMovesForGoats, getPossibleMovesForTiger, getPossibleMovesForTigers
} from './possibleMoves';
import { getTurn } from './turn';

const GOAT_WIN_SCORE = -20;
const TIGER_WIN_SCORE = 20;

// eslint-disable-next-line no-restricted-globals
self.onmessage = (
  ev: MessageEvent<{
    type: 'best_bot_move';
    state: GameState;
  }>
) => {
  if (ev.data?.type != 'best_bot_move') return;
  const { state } = ev.data;
  const turn = getTurn(state);

  let possibleMoves: Move[];
  if (turn == 'tiger' /* bot is tiger */) {
    possibleMoves = getPossibleMovesForTigers(state);
  } /* bot is goat */ else {
    possibleMoves = getPossibleMovesForGoats(state);
  }

  if (possibleMoves.length == 0) {
    // eslint-disable-next-line no-restricted-globals
    self.postMessage(null);
    return null;
  }

  const scores = possibleMoves.map(([from, to]) => {
    const newState = gameStateReducer(state, {
      type: 'move_directly',
      from,
      to,
    });
    return getScore(newState);
  });

  let bestScore = scores[0];
  let possibleMove = possibleMoves[0];
  for (let i = 1; i < scores.length; i++) {
    if (
      (scores[i] > bestScore && turn == 'tiger') ||
      (scores[i] < bestScore && turn == 'goat')
    ) {
      possibleMove = possibleMoves[i];
      bestScore = scores[i];
    }
  }

  // eslint-disable-next-line no-restricted-globals
  self.postMessage(possibleMove);
};

export function getScore(
  state: GameState,
  depth: number = 3,
  tigerRunningScore: number = GOAT_WIN_SCORE,
  goatRunningScore: number = TIGER_WIN_SCORE
): number {
  const turn = getTurn(state);
  const score = calcScoreForTiger(state);
  if (depth == 0 || score == GOAT_WIN_SCORE || score == TIGER_WIN_SCORE) {
    return score;
  }

  if (/* goal is -20 */ turn == 'goat') {
    let value = TIGER_WIN_SCORE;
    const possibleMoves = getPossibleMovesForGoats(state);
    for (const i in possibleMoves) {
      const newState = gameStateReducer(state, {
        type: 'move_directly',
        from: possibleMoves[i][0],
        to: possibleMoves[i][1],
      });
      value = Math.min(
        value,
        getScore(newState, depth - 1, tigerRunningScore, goatRunningScore)
      );
      if (value < tigerRunningScore) {
        break;
      }
      goatRunningScore = Math.min(goatRunningScore, value);
    }
    return value;
  } /* turn is tiger, goal is +20 */ else {
    let value = GOAT_WIN_SCORE;
    const possibleMoves = getPossibleMovesForTigers(state);

    for (const i in possibleMoves) {
      const newState = gameStateReducer(state, {
        type: 'move_directly',
        from: possibleMoves[i][0],
        to: possibleMoves[i][1],
      });
      value = Math.max(
        value,
        getScore(newState, depth - 1, tigerRunningScore, goatRunningScore)
      );
      if (value > goatRunningScore) {
        break;
      }
      tigerRunningScore = Math.max(tigerRunningScore, value);
    }
    return value;
  }
}

function calcScoreForTiger(state: GameState): number {
  // if 1 tiger blocked -5
  // if 1 goat eaten +1
  // target score is +20 for tiger, -20 for goat

  const allGoatsPlaced = isAllGoatsPlayed(state);
  const numOfGoatsEaten = allGoatsPlaced
    ? MAX_GOATS - state.goats.length
    : getNumberOfGoatsPlayed(state) - state.goats.length;

  let numOfTigersBlocked = state.tigers
    .map(
      (tiger) =>
        getPossibleMovesForTiger(tiger, state.tigers, state.goats).length
    )
    .filter((possibleMoves) => possibleMoves == 0).length;

  return numOfGoatsEaten - numOfTigersBlocked * 5;
}
