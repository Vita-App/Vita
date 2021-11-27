import { Schema, model, SchemaDefinitionProperty } from 'mongoose';
import {
  UserSchemaType,
  MentorSchemaType,
  DayEnumType,
  DurationType,
} from '../types';

const Duration = new Schema<DurationType>({
  start_hour: Number,
  end_hour: Number,
  available: Boolean,
  locale: String,
});
const TopicSchema = new Schema({
  emojiIcon: { type: String, index: 'text' },
  emojiBadge: { type: String, index: 'text' },
  motivation: { type: String, index: 'text' },
  topicName: { type: String, index: 'text' },
  topicDescription: { type: String, index: 'text' },
});

const MentorSchema = new Schema<MentorSchemaType>({
  user_id: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  image_link: { type: String },
  job_title: { type: String },
  company: { type: String },
  description: { type: [String] },
  expertise: { type: [String] },
  language: { type: [String] },
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
  first_name: { type: String },
  last_name: { type: String },
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
