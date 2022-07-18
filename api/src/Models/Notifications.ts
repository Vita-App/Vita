import mongoose from 'mongoose';
import { NotificationType } from '../types';

const { Schema } = mongoose;

const notificationSchema = new Schema<NotificationType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['read', 'unread'],
      default: 'unread',
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Notification', notificationSchema);
