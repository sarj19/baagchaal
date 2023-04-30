export const MAX_GOATS = 20;

export type PieceType = 'tiger' | 'goat';

export type GameHash = string;

export type UserId = string;

export type Move = [Position /* from */, Position /* to */];

export type GameType = 'self' | 'bot' | 'p2p_internet';

export type GameContext = {
  gameType?: GameType;
  gameHash?: GameHash;
  userId?: UserId;
  opponentId?: UserId;
  designation?: PieceType;
  winner?: PieceType;
  botLevel?: number;
  hint: boolean;
  debug: boolean;
};

export type GameContextActions =
  | {
      type: 'designate';
      value: PieceType;
    }
  | { type: 'set_winner'; value: PieceType }
  | { type: 'hint' }
  | { type: 'nohint' }
  | { type: 'set_opponent'; opponentId: UserId }
  | {
      type: 'new_game';
      gameType: GameType;
      designation: PieceType;
      userId?: UserId;
      gameHash?: GameHash;
      opponentId?: UserId;
      botLevel?: number;
    };

export interface GameState {
  goats: Position[];
  tigers: Position[];
  moves: Array<Move>;
  selectedPiece: Position | null;
  message: string | null;
}

export type ServerData = {
  userId: string;
  gameHash: string;
  moves: Move[];
};

export type ResumeGameData =
  | {
      gameType: 'p2p_internet';
      designation: PieceType;
      opponentId?: UserId;
      gameHash: GameHash;
      moves: Move[];
    }
  | {
      gameType: Omit<GameType, 'p2p_internet'>;
      designation: PieceType;
    };

export type GameStateActions =
  | { type: 'selected_without_turn'; value?: null }
  | { type: 'bot_thinking'; value?: null }
  | { type: 'gameover'; value: PieceType }
  | { type: 'select'; value: Position | null }
  | { type: 'move_directly'; from: Position; to: Position }
  | { type: 'server'; value: Move[] };

export type Position =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;
