import { GameContext, GameContextActions } from '../common/types';

export const initialState: GameContext = {
  hint: false,
  debug: false,
  showLeaveGame: false,
};

export function gameContextReducer(
  state: GameContext,
  action: GameContextActions
): GameContext {
  switch (action.type) {
    case 'designate': {
      // designation switch between goat & tiger only on self gameType
      // everything else is fixed and set from new_game
      if (state.gameType == 'self' && action.value != state.designation) {
        return { ...state, designation: action.value };
      }
      return state;
    }
    case 'leave_game': {
      if (action.value == state.showLeaveGame) {
        return state;
      }
      return { ...state, showLeaveGame: action.value };
    }
    case 'set_winner': {
      if (action.value != null) {
        // TODO validate winnder
        return { ...state, winner: action.value };
      }
      return state;
    }
    case 'hint': {
      return { ...state, hint: true };
    }
    case 'nohint': {
      return { ...state, hint: false };
    }
    case 'set_opponent': {
      return { ...state, opponentId: action.opponentId };
    }
    case 'new_game': {
      return {
        // reset automatically
        hint: state.hint,
        debug: state.debug,
        winner: undefined,
        showLeaveGame: false,

        // get as a new game values
        gameType: action.gameType,
        gameHash: action.gameHash,
        userId: action.userId,
        opponentId: action.opponentId,
        designation: action.designation,
        botLevel: action.botLevel,
      };
    }
  }
}
