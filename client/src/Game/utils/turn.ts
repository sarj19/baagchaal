import { GameContext, GameState, PieceType } from '../../common/types';

export function getTurn(state: GameState): PieceType {
  return state.moves.length % 2 === 0 ? 'goat' : 'tiger';
}

export function isTurn(
  state: GameState,
  designation: PieceType | null | undefined
): boolean {
  return getTurn(state) == designation;
}

export function gameOver(gameContext: GameContext): boolean {
  return gameContext.winner != null;
}
