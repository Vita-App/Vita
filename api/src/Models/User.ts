import { Schema, model } from 'mongoose';
import { hash, compare, genSalt } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  UserSchemaType,
  MentorSchemaType,
  DurationType,
  ExperienceType,
} from '../types';
import { EMAIL_VERIFICATION_JWT, JWT } from '../config/keys';

const Duration = new Schema<DurationType>({
  start: Date,
  end: Date,
  available: {
    type: Boolean,
    default: true,
  },
});

const Experience = new Schema<ExperienceType>({
  company: String,
  role: String,
  start_year: String,
  end_year: String,
});

const MentorSchema = new Schema<MentorSchemaType>({
  user_id: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  avatar: {
    type: {
      url: String,
      filename: String,
    },
  },
  experiences: {
    type: [Experience],
  },
  email: String,
  phone: { type: String },
  bio: { type: String },
  linkedIn: String,
  twitter: String,
  timezone: String,
  expertise: [String],
  languages: [String],
  is_mentoring: Boolean,
  topics: [Number],
  top_mentor: {
    type: Boolean,
    default: false,
  },
  time_slots: {
    type: [Duration],
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const UserSchema = new Schema<UserSchemaType>({
  user_id: String,
  first_name: String,
  last_name: String,
  password: String,
  graduation_year: String,
  phone: { type: String },
  email: String,
  stream: String,
  bio: String,
  timezone: String,
  interests: [String],
  avatar: {
    type: {
      url: String,
      filename: String,
    },
  },
  create_time: {
    type: Date,
    default: new Date(),
  },
  oauth_provider: String,
  is_mentor: Boolean,
  token: String,
  signup_completed: {
    type: Boolean,
    default: false,
  },
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
  verified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }

  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await compare(password, this.password);
};

UserSchema.methods.createVerificationToken = function () {
  const token = jwt.sign({ user_id: this._id }, EMAIL_VERIFICATION_JWT.secret, {
    expiresIn: EMAIL_VERIFICATION_JWT.expiresIn,
  });

  this.token = token;

  this.save();
  return token;
};

UserSchema.methods.issueToken = function () {
  return jwt.sign({ user_id: this._id }, JWT.secret, {
    expiresIn: JWT.expiresIn,
  });
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.token;
  return user;
};

UserSchema.index({
  phone: 'text',
});

MentorSchema.index(
  {
    name: 'text',
    job_title: 'text',
    company: 'text',
    description: 'text',
    expertise: 'text',
    language: 'text',
  },
  {
    language_override: 'dummy',
    weights: {
      company: 3,
      job_title: 4,
      expertise: 4,
    },
  },
); // Full Text Search index on mentor model

export const UserModel = model('User', UserSchema);
export const MentorModel = model('Mentor', MentorSchema);
