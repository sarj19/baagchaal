import { adjancentPositions } from './adjancentPositions';

export function isValidPositionToMove(from: number, to: number): boolean {
  if (
    from > 24 ||
    to > 24 ||
    from < 0 ||
    to < 0 ||
    parseInt(`${from}`, 10) !== from ||
    parseInt(`${to}`, 10) !== to
  ) {
    return false;
  }
  // @ts-ignore
  return adjancentPositions[from].has(to);
}
