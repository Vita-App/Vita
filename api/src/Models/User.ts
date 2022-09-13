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
  countryCode: { type: String },
  avatar: {
    type: {
      url: String,
      filename: String,
    },
    required: true,
  },
  experiences: {
    type: [Experience],
  },
  email: String,
  maxSessionReqsPerMonth: {
    type: Number,
    default: 5,
  },
  currentSessions: {
    type: Number,
    default: 0,
  },
  currSessionReqs: {
    type: Number,
    default: 0,
  },
  maxSessionsPerMonth: {
    type: Number,
    default: 8,
  },
  lastSessionReq: {
    type: Date,
  },
  phone: { type: String },
  bio: { type: String },
  linkedIn: String,
  twitter: String,
  timezone: String,
  expertise: [String],
  languages: [String],
  graduation_year: String,
  is_mentoring: {
    type: Boolean,
    default: true,
  },
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
  likes: {
    type: Number,
    default: 0,
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
  verified: {
    type: Boolean,
    default: false,
  },
  liked_mentors: [{ type: Schema.Types.ObjectId, ref: 'Mentor' }],
  maxSessionsCanReqPerMonth: {
    type: Number,
    default: 5,
  },
  currentSessionsRequested: {
    type: Number,
    default: 0,
  },
  lastSessionRequested: {
    type: Date,
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
  if (!this.password) {
    throw new Error(
      'You do not have a password for this account, please log in using your Google Account!',
    );
  }

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

// MentorSchema.index(
//   {
//     first_name: 'text',
//     last_name: 'text',
//     experiences: 'text',
//     expertise: 'text',
//   },
//   {
//     language_override: 'dummy',
//     weights: {
//       experiences: 3,
//       expertise: 4,
//     },
//   },
// ); // Full Text Search index on mentor model

export const UserModel = model('User', UserSchema);
export const MentorModel = model('Mentor', MentorSchema);
