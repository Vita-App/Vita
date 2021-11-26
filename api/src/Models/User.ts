import { Schema, model, SchemaDefinitionProperty } from 'mongoose';
import {
  UserSchemaType,
  MentorSchemaType,
  DayEnumType,
  DurationType,
} from '../types';

const TopicsSchema = new Schema({
  emojiIcon: String,
  emojiBadge: String,
  motivation: String,
  topicName: String,
  topicDescription: String,
});
const Duration = new Schema<DurationType>({
  start_hour: Number,
  end_hour: Number,
  available: Boolean,
  locale: String,
});

const MentorSchema = new Schema<MentorSchemaType>({
  user_id: String,
  first_name: String,
  image_link: String,
  last_name: String,
  job_title: String,
  company: String,
  description: [String],
  expertise: [String],
  language: [String],
  linkedIn: String,
  is_mentoring: Boolean,
  topics: [Number],
  time_slot: {
    monday: { type: Duration },
    tuesday: { type: Duration },
    wednesday: { type: Duration },
    thursday: { type: Duration },
    friday: { type: Duration },
    saturday: { type: Duration },
    sunday: { type: Duration },
  },
});

const UserSchema = new Schema<UserSchemaType>({
  user_id: String,
  first_name: String,
  last_name: String,
  email: String,
  image_link: String,
  create_time: {
    type: Date,
    default: new Date(),
  },
  oauth_provider: String,
  is_mentor: Boolean,
  signup_completed: Boolean,
  mentor_information: {
    type: Schema.Types.ObjectId,
    ref: 'Mentor',
    default: null,
  },
  bookings: {
    type: [Schema.Types.ObjectId],
    ref: 'Booking',
    default: [],
  },
});

export const UserModel = model('User', UserSchema);
export const MentorModel = model('Mentor', MentorSchema);
