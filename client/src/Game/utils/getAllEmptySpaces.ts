import { Position } from '../../common/types';
import { ARR_0_TO_24 } from './consts';
import { isEmptySpace } from './isEmptySpace';

export function getAllEmptySpaces(
  tigers: Position[],
  goats: Position[]
): Position[] {
  return ARR_0_TO_24.filter((p) => isEmptySpace(p, goats, tigers));
}
