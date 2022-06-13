import { Types, Document } from 'mongoose';

export interface UserSchemaType {
  user_id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  image_link: string;
  create_time: Date;
  oauth_provider: string;
  is_mentor: boolean;
  signup_completed: boolean;
  mentor_information: Types.ObjectId | undefined;
  bookings: Types.ObjectId[] | undefined;
  verified: boolean;
  token: string;
  issueToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
  createVerificationToken: () => string;
}

export interface TopicSchemaType {
  value: number;
  emojiIcon: string;
  emojiBadge: string;
  motivation: string;
  topicName: string;
  topicDescription: string;
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
  start_hour: number;
  end_hour: number;
  available: boolean;
  locale: string;
}

export interface MentorSchemaType {
  user_id: string;
  first_name: string;
  last_name: string;
  image_link: string;
  job_title: string;
  company: string;
  description: string[];
  expertise: string[];
  language: string[];
  linkedIn: string;
  twitter: string;
  is_mentoring: boolean;
  topics: number[];
  time_slots: Record<DayEnumType, DurationType>;
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
