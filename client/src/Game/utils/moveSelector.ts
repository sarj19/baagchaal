import { GameState, Move } from '../../common/types';
import { getPossibleMovesForGoats, getPossibleMovesForTigers } from './possibleMoves';
import { getTurn } from './turn';

function getRandomMove(state: GameState): Move | null {
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
  level: number,
  onMove: (scoredMove: Move | null) => void
) {
  if (level == 0) {
    onMove(getRandomMove(state));
    return;
  }
  const worker = new Worker(new URL('./bestBotMove.ts', import.meta.url));
  worker.onmessage = (ev) => {
    onMove(ev.data);
  };

  worker.postMessage({
    type: 'best_bot_move',
    state,
    level,
  });
}
