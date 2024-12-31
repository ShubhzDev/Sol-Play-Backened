import mongoose from 'mongoose';
import { IGame, GameType, GameStatus } from './types';

const gameSchema = new mongoose.Schema<IGame>({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  gameHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'GameHistory' },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Winner' },
  gameType: { type: String, enum: Object.values(GameType), required: true },
  gameStatus: { 
    type: String, 
    enum: Object.values(GameStatus), 
    default: GameStatus.ACTIVE 
  }
});

export default mongoose.model<IGame>('Game', gameSchema);