import { GameState, GameStateActions, Position } from '../../common/types';
import { canTigerEatGoat } from '../utils/canTigerEatGoat';
import { isAllGoatsPlayed } from '../utils/goats';
import { isTurn } from '../utils/turn';
import { isEmptySpace, isValidPositionToMove } from '../utils/validPositions';

export const initialState: GameState = {
  selectedPiece: null,
  moves: [],
  tigers: [0, 4, 20, 24],
  goats: [],
  message: null,
};

export function gameStateReducer(
  state: GameState,
  action: GameStateActions
): GameState {
  switch (action.type) {
    case 'selected_without_turn': {
      return {
        ...state,
        message: 'Waiting on other player to move',
      };
    }
    case 'gameover': {
      return {
        ...state,
        message:
          action.value === 'goat'
            ? 'Goat trapped tigers'
            : 'Tiger ate all goats',
      };
    }
    case 'select': {
      if (state.selectedPiece === null) {
        return maybeSelectPiece(state, action.value);
      } else if (action.value !== null) {
        const newState = isTurn(state, 'goat')
          ? maybeMoveGoat(state, state.selectedPiece, action.value)
          : maybeMoveTiger(state, state.selectedPiece, action.value);

        if (newState != state) {
          return newState;
        }
        return maybeSelectPiece(state, action.value);
      }
      return state;
    }
    case 'move_directly': {
      return isTurn(state, 'goat')
        ? maybeMoveGoat(state, action.from, action.to)
        : maybeMoveTiger(state, action.from, action.to);
    }
    case 'server': {
      if (state.moves.length >= action.value.length) {
        return state;
      }

      let newState = state;
      newState.moves.forEach((move, index) => {
        // validate each move
        if (
          move[0] !== action.value[index][0] ||
          move[1] !== action.value[index][1]
        ) {
          console.error('server data does not add up with local data');
          return state;
        }
      });

      for (let i = newState.moves.length; i < action.value.length; i++) {
        const [from, to] = action.value[i];
        newState = isTurn(newState, 'goat')
          ? maybeMoveGoat(newState, from, to)
          : maybeMoveTiger(newState, from, to);

        // if move was not valid, help break out of the loop
        if (newState.moves.length !== i + 1) {
          console.error('move from server was not valid');
          return state;
        }
      }

      return newState;
    }
  }
}

function maybeSelectPiece(state: GameState, value: Position | null): GameState {
  return isTurn(state, 'goat')
    ? maybeSelectGoat(state, value)
    : maybeSelectTiger(state, value);
}

function maybeSelectTiger(state: GameState, value: Position | null): GameState {
  if (value === null || state.tigers.includes(value)) {
    return { ...state, selectedPiece: value, message: null };
  }
  return state;
}

function maybeSelectGoat(state: GameState, value: Position | null): GameState {
  const allGoatsPlayed = isAllGoatsPlayed(state);
  if (
    value === null ||
    (state.goats.includes(value) && allGoatsPlayed) ||
    (isEmptySpace(value, state.goats, state.tigers) && !allGoatsPlayed)
  ) {
    return { ...state, selectedPiece: value, message: null };
  }
  return state;
}

function maybeMoveTiger(
  state: GameState,
  from: Position,
  to: Position
): GameState {
  if (from === null) {
    return { ...state, message: 'Select a tiger to move first' };
  }

  if (state.tigers.includes(to)) {
    return state;
  }

  if (!state.tigers.includes(from)) {
    return { ...state, message: 'Select a tiger to move first' };
  }

  // if adjacent goat is clicked
  if (state.goats.includes(to)) {
    // if goat selected
    const actualTo = canTigerEatGoat(state.tigers, state.goats, from, to);
    if (actualTo === null) {
      return { ...state, message: 'The tiger cannot eat the goat' };
    }

    const goats = state.goats.filter((x) => x !== to);
    const tigers = state.tigers.filter((x) => x !== from);
    tigers.push(actualTo);

    return {
      ...state,
      selectedPiece: null,
      moves: [...state.moves, [from, to]],
      tigers,
      goats,
      message: null,
    };
  }

  // empty adjacent space
  if (isValidPositionToMove(from, to)) {
    const newTigers = state.tigers.filter((x) => x !== from);
    newTigers.push(to);
    return {
      ...state,
      selectedPiece: null,
      moves: [...state.moves, [from, to]],
      tigers: newTigers,
      message: null,
    };
  }

  // if empty spot past goat selected
  // takes advantage of neat trick where delta between
  // tiger -> goat -> empty is same
  // its always 6 or 4 or 5 or 1
  const posDelta = (from! - to) / 2;
  const goatPos = to + posDelta;

  if (
    // verify it is a valid path
    isValidPositionToMove(to, goatPos) === true &&
    isValidPositionToMove(from!, goatPos) === true
  ) {
    const goats = state.goats.filter((x) => x !== goatPos);
    const tigers = state.tigers.filter((x) => x !== from);
    tigers.push(to);

    return {
      ...state,
      selectedPiece: null,
      moves: [...state.moves, [from, to]],
      tigers,
      goats,
      message: null,
    };
  }

  return state;
}

function maybeMoveGoat(
  state: GameState,
  from: Position,
  to: Position
): GameState {
  if (isAllGoatsPlayed(state)) {
    if (from === null) {
      return { ...state, message: 'Select a goat to move.' };
    }

    if (!state.goats.includes(from)) {
      return {
        ...state,
        selectedPiece: null,
        message: "It's goat's turn to mvoe.",
      };
    }

    if (state.tigers.includes(to)) {
      return { ...state, message: 'Move the goat to empty space.' };
    }

    if (isValidPositionToMove(from, to) && !state.goats.includes(to)) {
      const newGoats = state.goats.filter((x) => x !== from);
      newGoats.push(to);
      return {
        ...state,
        selectedPiece: null,
        moves: [...state.moves, [from, to]],
        goats: newGoats,
        message: null,
      };
    }
  } else if (from == to) {
    if (state.goats.includes(to) || state.tigers.includes(to)) {
      return { ...state, message: 'Select empty space to place new goat.' };
    }

    return {
      ...state,
      selectedPiece: null,
      moves: [...state.moves, [from!, to]],
      goats: [...state.goats, to],
      message: null,
    };
  }
  return state;
}
