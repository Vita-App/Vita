import { Schema, model } from 'mongoose';
import { UserModelType } from '../types';

const TopicsSchema = new Schema({
  JobSearch: [Number],
  CarrerAdvice: [Number],
  Mentorship: [Number],
  Leadership: [Number],
  Skills: [Number],
});

const MentorSchema = new Schema({
  user_id: String,
  name: String,
  job_title: String,
  company: String,
  description: [String],
  expertise: [String],
  language: [String],
  linkedIn: String,
  isMentoring: Boolean,
  topics: TopicsSchema,
});

const UserSchema = new Schema<UserModelType>({
  user_id: String,
  name: String,
  email: String,
  image_link: String,
  create_time: {
    type: Date,
    default: new Date(),
  },
  oauth_provider: String,
  isMentor: Boolean,
  signupCompleted: Boolean,
  mentorInformation: {
    type: Schema.Types.ObjectId,
    ref: 'Mentor',
    default: null,
  },
});

export const UserModel = model('User', UserSchema);
export const MentorModel = model('Mentor', UserSchema);
