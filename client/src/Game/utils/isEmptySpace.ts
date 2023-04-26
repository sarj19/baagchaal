import { Position } from '../../common/types';

export function isEmptySpace(
  pos: Position,
  goats: Position[],
  tigers: Position[]
): boolean {
  return !(goats.includes(pos) || tigers.includes(pos));
}
