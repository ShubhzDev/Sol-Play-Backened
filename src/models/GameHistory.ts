import mongoose from 'mongoose';
import { IGameHistory } from './types';

const gameHistorySchema = new mongoose.Schema<IGameHistory>({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  moves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Move' }]
});

export default mongoose.model<IGameHistory>('GameHistory', gameHistorySchema);