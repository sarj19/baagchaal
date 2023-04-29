import { Position } from '../../common/types';
import { isValidPositionToMove } from './validPositions';

// return project tiger position
export function canTigerEatGoat(
  tigers: number[],
  goats: number[],
  tigerPos: number,
  goatPos: number
): Position | null {
  if (!isValidPositionToMove(tigerPos, goatPos)) {
    return null;
  }

  // takes advantage of neat trick where delta between
  // tiger -> goat -> empty is same
  // its always 6 or 4 or 5 or 1
  const posDelta = goatPos - tigerPos;
  const projectedTigerPos = goatPos + posDelta;
  if (projectedTigerPos < 0 || projectedTigerPos > 24) {
    return null;
  }

  // verify projectTigerPos is valid place to go
  if (
    isValidPositionToMove(projectedTigerPos, goatPos) == true &&
    // there is no another tiger or goat
    !tigers.includes(projectedTigerPos) &&
    !goats.includes(projectedTigerPos)
  ) {
    // @ts-ignore number below is gauranteed to bePosition
    return projectedTigerPos;
  }
  return null;
}
