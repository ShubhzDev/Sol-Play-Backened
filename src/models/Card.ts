import mongoose from 'mongoose';
import { ICard } from './types';

const cardSchema = new mongoose.Schema<ICard>({
  cardName: { type: String, required: true },
  color: { type: String, required: true },
  value: { type: String, required: true }
});

export default mongoose.model<ICard>('Card', cardSchema);