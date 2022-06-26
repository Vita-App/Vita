import mongoose from 'mongoose';
import { BannerSchemaType } from '../types';

const BannerSchema = new mongoose.Schema<BannerSchemaType>({
  content: { type: String, required: true },
  height: { type: Number, required: true },
  show: { type: Boolean, default: true },
});

export const BannerModel = mongoose.model('Banner', BannerSchema);
