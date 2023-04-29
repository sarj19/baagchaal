import { GameState, MAX_GOATS, Move } from '../../common/types';
import { gameStateReducer } from '../reducers/gameStateReducer';
import { getNumberOfGoatsPlayed, isAllGoatsPlayed } from './goats';
import {
    getPossibleMovesForGoats, getPossibleMovesForTiger, getPossibleMovesForTigers
} from './possibleMoves';
import { getTurn } from './turn';

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

export function getScore(state: GameState, depth: number = 3): number {
  const turn = getTurn(state);
  const score = calcScoreForTiger(state);
  if (depth == 0 || score == 20 || score == -20) {
    return score;
  }

  if (/* goal is -20 */ turn == 'goat') {
    let value = 20;
    const possibleMoves = getPossibleMovesForGoats(state);
    possibleMoves.forEach(([from, to]) => {
      const newState = gameStateReducer(state, {
        type: 'move_directly',
        from,
        to,
      });
      value = Math.min(value, getScore(newState, depth - 1));
    });
    return value;
  } /* turn is tiger, goal is +20 */ else {
    let value = -20;
    const possibleMoves = getPossibleMovesForTigers(state);
    possibleMoves.forEach(([from, to]) => {
      const newState = gameStateReducer(state, {
        type: 'move_directly',
        from,
        to,
      });
      value = Math.max(value, getScore(newState, depth - 1));
    });
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
