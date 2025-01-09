import mongoose from 'mongoose';
import { IGameHistory, IGameState, IMove } from './types';

const gameHistorySchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  states: [{
    gameId: String,
    players: [{
      playerId: String,
      cards: [String]
    }],
    currentPlayer: String,
    lastPlayedCard: String,
    direction: Number,
    deck: [String],
    timestamp: { type: Date, default: Date.now }
  }],
  moves: [{
    playerId: String,
    moveType: String,
    cardId: String,
    timestamp: Date
  }],
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
});

export default mongoose.model('GameHistory', gameHistorySchema);