import { Position } from '../../common/types';

// @ts-ignore
export const ARR_0_TO_24: Position[] = Array.from(Array(25).keys());

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

export function isEmptySpace(
  pos: Position,
  goats: Position[],
  tigers: Position[]
): boolean {
  return !(goats.includes(pos) || tigers.includes(pos));
}

export function getAllEmptySpaces(
  tigers: Position[],
  goats: Position[]
): Position[] {
  return ARR_0_TO_24.filter((p) => isEmptySpace(p, goats, tigers));
}

/**
 *  0   1   2   3   4
 *  5   6   7   8   9
 *  10  11  12  13  14
 *  15  16  17  18  19
 *  20  21  22  23  24
 */

const adjPosArray: Position[][] = [
  /* 0  */ [1, 5, 6],
  /* 1  */ [0, 2, 6],
  /* 2  */ [1, 3, 6, 7, 8],
  /* 3  */ [2, 4, 8],
  /* 4  */ [3, 8, 9],
  /* 5  */ [0, 6, 10],
  /* 6  */ [0, 1, 2, 5, 7, 10, 11, 12],
  /* 7  */ [2, 6, 8, 12],
  /* 8  */ [2, 3, 4, 7, 9, 12, 13, 14],
  /* 9  */ [4, 8, 14],
  /* 10 */ [5, 6, 11, 15, 16],
  /* 11 */ [6, 10, 12, 16],
  /* 12 */ [6, 7, 8, 11, 13, 16, 17, 18],
  /* 13 */ [8, 12, 14, 18],
  /* 14 */ [8, 9, 13, 18, 19],
  /* 15 */ [10, 16, 20],
  /* 16 */ [10, 11, 12, 15, 17, 20, 21, 22],
  /* 17 */ [12, 16, 18, 22],
  /* 18 */ [12, 13, 14, 17, 19, 22, 23, 24],
  /* 19 */ [14, 18, 24],
  /* 20 */ [15, 16, 21],
  /* 21 */ [16, 20, 22],
  /* 22 */ [16, 17, 18, 21, 23],
  /* 23 */ [18, 22, 24],
  /* 24 */ [18, 19, 23],
];

export const adjancentPositions: Set<Position>[] = adjPosArray.map(
  (element) => new Set(element)
);
