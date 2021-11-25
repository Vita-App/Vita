import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  booking_id: String,
  menteeEmail: String,
  mentorEmail: String,
  start_time: Date,
  end_time: Date,
  status: {
    type: String,
    enum: ['accepted', 'cancelled', 'waiting'],
    default: 'waiting',
  },
  session: {
    motivation: String,
    topic: String,
    description: String,
  },
});

export const BookingModel = model('Booking', BookingSchema);
