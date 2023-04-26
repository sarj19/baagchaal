import { GameContext, GameContextActions } from '../common/types';

export const initialState: GameContext = {
  hint: false,
};

export function gameContextReducer(
  state: GameContext,
  action: GameContextActions
): GameContext {
  switch (action.type) {
    case "designate": {
      // designation switch between goat & tiger only on self gameType
      // everything else is fixed and set from new_game
      if (state.gameType == "self" && action.value != state.designation) {
        return { ...state, designation: action.value };
      }
      return state;
    }
    case "set_winner": {
      if (action.value != null) {
        // TODO validate winnder
        return { ...state, winner: action.value };
      }
      return state;
    }
    case "hint": {
      return { ...state, hint: true };
    }
    case "nohint": {
      return { ...state, hint: false };
    }
    case "set_opponent": {
      return { ...state, opponentId: action.opponentId };
    }
    case "new_game": {
      return {
        ...state,
        gameType: action.gameType,
        gameHash: action.gameHash,
        designation: action.designation,
        userId: action.userId,
        opponentId: action.opponentId,
      };
    }
  }
}
