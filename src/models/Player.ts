import mongoose from 'mongoose';
import { IPlayer } from './types';

const playerSchema = new mongoose.Schema<IPlayer>({
  discordId: { type: String, required: true, unique: true },
  discordName: { type: String, required: true },
  userName: { type: String, required: true },
  name: { type: String, required: true },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

export default mongoose.model<IPlayer>('Player', playerSchema);