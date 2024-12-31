import mongoose from 'mongoose';
import { IWinner } from './types';

const winnerSchema = new mongoose.Schema<IWinner>({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true, unique: true },
  discordId: { type: String, required: true },
  discordName: { type: String, required: true },
  userName: { type: String, required: true },
  name: { type: String, required: true }
});

export default mongoose.model<IWinner>('Winner', winnerSchema);