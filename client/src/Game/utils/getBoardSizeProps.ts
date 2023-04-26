const MAX_BOARD_SIZE = 700;
const HEADER_SIZE = 140;
const SIDE_BUTTONS_SIZE = 200;
const FIXED_BOTTOM_SIZE = 60;
const HORIZ_PADDING = 20;

export function getBoardSizeProps(): [number, boolean] /* size, isPotrait */ {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const maxBoardSizeIfPotrait = Math.min(
    height - FIXED_BOTTOM_SIZE - HEADER_SIZE,
    width - HORIZ_PADDING
  );
  const maxBoardSizeIfLandscape = Math.min(
    height - HEADER_SIZE,
    width - SIDE_BUTTONS_SIZE
  );

  return [
    Math.min(
      Math.max(maxBoardSizeIfPotrait, maxBoardSizeIfLandscape),
      MAX_BOARD_SIZE
    ),
    maxBoardSizeIfLandscape <= maxBoardSizeIfPotrait,
  ];
}
