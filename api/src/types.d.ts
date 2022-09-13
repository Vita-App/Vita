import { Document, Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: Express.User & (Document & (AdminSchemaType | UserSchemaType));
    }
  }
}

export interface UserSchemaType {
  user_id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phone: string;
  avatar: {
    url?: string;
    filename?: string;
  };
  bio: string;
  timezone: string;
  graduation_year: string;
  stream: string;
  interests: string[];
  create_time: Date;
  oauth_provider: string;
  is_mentor: boolean;
  signup_completed: boolean;
  mentor_information: Types.ObjectId | undefined;
  bookings: Types.ObjectId[] | undefined;
  verified: boolean;
  token: string;
  liked_mentors: Types.ObjectId[];
  issueToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
  createVerificationToken: () => string;
  maxSessionsCanReqPerMonth: number;
  currentSessionsRequested: number;
  lastSessionRequested?: Date;
}

export interface AdminSchemaType {
  name: string;
  email: string;
  password: string;
  otp: number;
  validTill: Date;
  comparePassword: (password: string) => Promise<boolean>;
  verifyOTP: (otp: number) => Promise<boolean>;
  generateOTP: () => Promise<number>;
  issueToken: () => string;
}

export interface WaitListSchemaType {
  name: string;
  email: string;
  inviteCode: string;
  invited: boolean;
}
export interface TopicSchemaType {
  value: number;
  emojiIcon: string;
  emojiBadge: string;
  motivation: string;
  topicName: string;
  topicDescription: string;
}

export interface BannerSchemaType {
  content: string;
  height: number;
  show: boolean;
}

type DayEnumType =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

interface DurationType {
  start: Date;
  end: Date;
  available: boolean;
}

export interface ExperienceType {
  company: string;
  role: string;
  start_year: string;
  end_year: string;
}

export interface MentorSchemaType {
  user_id: string;
  first_name: string;
  last_name: string;
  avatar: {
    url?: string;
    filename?: string;
  };
  experiences: ExperienceType[];
  email: string;
  graduation_year: string;
  countryCode: string;
  timezone: string;
  bio: string;
  phone: string;
  expertise: string[];
  languages: string[];
  linkedIn: string;
  twitter: string;
  is_mentoring: boolean;
  topics: number[];
  time_slots: DurationType[];
  approved: boolean;
  top_mentor: boolean;
  likes: number;
  maxSessionReqsPerMonth: number;
  currentSessions: number;
  maxSessionsPerMonth: number;
  currSessionReqs: number;
  lastSessionReq?: Date;
}

interface Session {
  email?: string;
  topic?: string;
  description?: string;
  status?: 'rated' | 'unrated';
  rating?: number;
}

export interface BookingSchemaType {
  mentor: Types.ObjectId | undefined;
  mentee: Types.ObjectId | undefined;
  mentor_email: string;
  mentee_email: string;
  start_date: Date;
  end_date: Date;
  google_meeting_link: string;
  event_id: string;
  status: 'accepted' | 'cancelled' | 'waiting';
  session: Session;
}

export interface Room {
  id: string; // Client version of Room may have id optional
  created_by?: string;
  name?: string;
  opts?: {
    maxPeople?: string; // Will be int parsed when used
  };
}

export interface Topic {
  value: number;
  topicName: string;
  motivation: MotivationEnumType;
  description: string;
  emojiIcon: string;
  emojiBadge: string;
}

export type MotivationEnumType =
  | 'Job Search'
  | 'Career Advice'
  | 'Mentorship'
  | 'Leadership'
  | 'Skills';

export interface AdminUser extends Express.User {
  role: 'admin' | null | undefined;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface CalenderCredentialsSchemaTypes {
  email: string;
  refresh_token: string;
}

export interface AttendeesEmailTypes {
  email: string;
}

export interface CalendarOptionTypes {
  startTime: Date;
  endTime: Date;
  attendeesEmails: AttendeesEmail[];
  summary: string | undefined;
  description: string | undefined;
}

export interface NotificationType {
  user: Types.ObjectId;
  title: string;
  text: string;
  link: string;
  status: 'read' | 'unread';
}

export interface StatsType {
  likes: number;
  meetings: number;
  reports: number;
}
