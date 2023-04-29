import { GameState, Move } from '../../common/types';
import { getPossibleMovesForGoats, getPossibleMovesForTigers } from './possibleMoves';
import { getTurn } from './turn';

export function getRandomMove(state: GameState): Move | null {
  const turn = getTurn(state);
  let possibleMoves: Move[];
  if (turn == 'tiger') {
    possibleMoves = getPossibleMovesForTigers(state);
  } /* goat */ else {
    possibleMoves = getPossibleMovesForGoats(state);
  }

  if (possibleMoves.length == 0) return null;

  const moveIndex = Math.floor(Math.random() * possibleMoves.length);
  return possibleMoves[moveIndex];
}

export function getScoredMove(
  state: GameState,
  onMove: (scoredMove: Move | null) => void
) {
  const worker = new Worker(new URL('./bestBotMove.ts', import.meta.url));
  worker.onmessage = (ev) => {
    onMove(ev.data);
  };

  worker.postMessage({
    type: 'best_bot_move',
    state,
  });
}
