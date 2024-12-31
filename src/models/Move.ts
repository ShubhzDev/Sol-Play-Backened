import mongoose from 'mongoose';
import { IMove } from './types';

const moveSchema = new mongoose.Schema<IMove>({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
  gameHistoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'GameHistory', required: true }
});

export default mongoose.model<IMove>('Move', moveSchema);