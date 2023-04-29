import { GameContext, GameState, Position } from '../../common/types';
import { canTigerEatGoat } from './canTigerEatGoat';
import { isAllGoatsPlayed } from './goats';
import { isTurn } from './turn';
import { adjancentPositions, ARR_0_TO_24 } from './validPositions';

export default function getHintHighlightPositions(
  state: GameState,
  { hint, designation }: GameContext
): [Set<Position>, Position[]] {
  const highlight = new Set<Position>();
  let possibleNewPosForGoats: Position[] = [];
  if (hint === true && isTurn(state, designation)) {
    if (isTurn(state, 'goat')) {
      if (isAllGoatsPlayed(state)) {
        state.goats.forEach((goat) => {
          adjancentPositions[goat].forEach((adjPos) => {
            if (
              !state.goats.includes(adjPos) &&
              !state.tigers.includes(adjPos)
            ) {
              // if nobody nearby
              highlight.add(goat);
            }
          });
        });
      } else {
        // show potential place to drop goats
        possibleNewPosForGoats = ARR_0_TO_24.filter(
          (pos) => !state.goats.includes(pos) && !state.tigers.includes(pos)
        );
      }
    } else if (isTurn(state, 'tiger')) {
      state.tigers.forEach((tiger) => {
        adjancentPositions[tiger].forEach((adjPos) => {
          if (state.goats.includes(adjPos)) {
            // has goats, so check if can eat
            if (canTigerEatGoat(state.tigers, state.goats, tiger, adjPos)) {
              highlight.add(tiger);
            }
          } else if (!state.tigers.includes(adjPos)) {
            // not blocked by other tigers
            highlight.add(tiger);
          }
        });
      });
    }
  }

  return [highlight, possibleNewPosForGoats];
}
