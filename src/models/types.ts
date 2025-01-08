export enum GameType {
  UNO = 'UNO'
}

export enum GameStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  PENDING = 'PENDING'
}

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

export interface IMove {
  playerId: string | undefined;
  cardId: string | undefined;
  gameHistoryId: string | undefined;
}

export interface ICard {
  cardName: string;
  color: string;
  value: string;
}