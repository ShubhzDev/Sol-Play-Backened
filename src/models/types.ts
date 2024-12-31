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
  gameId: string;
  discordId: string;
  discordName: string;
  userName: string;
  name: string;
}

export interface IGameHistory {
  gameId: string;
  moves: string[];
}

export interface IMove {
  playerId: string;
  cardId: string;
  gameHistoryId: string;
}

export interface ICard {
  cardName: string;
  color: string;
  value: string;
}