import mongoose from 'mongoose';
import { WaitListSchemaType } from '../types';

const { Schema } = mongoose;

const waitlistSchema = new Schema<WaitListSchemaType>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  inviteCode: { type: String, required: true },
  invited: { type: Boolean, default: false },
});

export const Waitlist = mongoose.model('Waitlist', waitlistSchema, 'waitlist');
