// export enum GameType {
//   UNO = 'UNO'
// }

// export enum GameStatus {
//   ACTIVE = 'ACTIVE',
//   FINISHED = 'FINISHED',
//   PENDING = 'PENDING'
// }

export interface IPlayer {
  discordId: string;
  discordName: string;
  userName: string;
  name: string;
  games?: string[];
}

export interface IGame {
  players: string[];
  gameHistory?: string;
  winner?: string;
  gameType: GameType;
  gameStatus: GameStatus;
}

export interface IWinner {
  gameId: string | undefined;
  discordId: string;
  discordName: string;
  userName: string;
  name: string;
}

export interface IGameHistory {
  gameId: string | undefined;
  moves: string[];
}

// export interface IMove {
//   playerId: string | undefined;
//   cardId: string | undefined;
//   gameHistoryId: string | undefined;
// }

export interface ICard {
  cardName: string;
  color: string;
  value: string;
}

export enum GameType {
  UNO = 'UNO'
}

export enum GameStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  PENDING = 'PENDING'
}

export enum MoveType {
  DRAW = 'DRAW',
  PLAY = 'PLAY',
  PASS = 'PASS'
}

export interface IPlayer {
  discordId: string;
  discordName: string;
  userName: string;
  name: string;
  games?: string[];
  cards?: string[]; // Array of card IDs
}

export interface IGame {
  players: string[];
  gameHistory?: string;
  winner?: string;
  gameType: GameType;
  gameStatus: GameStatus;
  deck: string[]; // Array of card IDs
  currentPlayer: string;
  direction: 1 | -1; // 1 for clockwise, -1 for counter-clockwise
  lastPlayedCard?: string;
}

export interface IGameState {
  gameId: string;
  players: {
    playerId: string;
    cards: string[];
  }[];
  currentPlayer: string;
  lastPlayedCard?: string;
  direction: 1 | -1;
  deck: string[];
}

export interface IMove {
  playerId: string;
  moveType: MoveType;
  cardId?: string; // Optional for DRAW and PASS moves
  gameId: string;
  timestamp: Date;
}

