import faker from '@faker-js/faker';
import moment from 'moment-timezone';
import { nanoid } from 'nanoid';
import {
  getRandom,
  getRandomArray,
  getRandomBool,
  getRandomExperiences,
  getRandomTimeSlots,
} from './data';
import {
  countryCode,
  expertise,
  interests,
  languages,
  streams,
  topicNums,
} from './data/fakeData';
import { MentorSchemaType, UserSchemaType } from './types';

export const getDevUser = (mentor: boolean) => {
  const user_id = nanoid();
  const first_name = 'Dev';
  const last_name = mentor ? 'Mentor' : 'Mentee';
  const avatar = {
    url: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    filename: 'Default',
  };
  const email = `dev@${mentor ? 'mentor' : 'mentee'}.com`;
  const phone = faker.phone.phoneNumber();
  const bio = `I'm dev-${mentor ? 'mentor' : 'mentee'}`;
  const graduation_year = '2021';

  const userData: UserSchemaType = {
    first_name,
    last_name,
    email,
    oauth_provider: 'google',
    avatar,
    mentor_information: undefined,
    signup_completed: true,
    timezone: moment.tz.guess(),
    is_mentor: mentor,
    user_id,
    create_time: new Date(),
    bookings: [],
    password: `dev-${mentor ? 'mentor' : 'mentee'}`,
    bio,
    graduation_year,
    token: '',
    phone,
    interests: getRandomArray(interests),
    stream: getRandom(streams),
    comparePassword: () => Promise.resolve(true),
    issueToken: () => '',
    createVerificationToken: () => '',
    verified: true,
    liked_mentors: [],
    maxSessionsCanReqPerMonth: 5,
    currentSessionsRequested: 0,
  };

  const mentorData: Partial<MentorSchemaType> = {
    user_id,
    first_name,
    last_name,
    email,
    avatar,
    phone,
    bio,
    approved: true,
    graduation_year,
    languages: ['English', ...getRandomArray(languages, 1)],
    expertise: getRandomArray(expertise),
    is_mentoring: getRandomBool(0.3),
    linkedIn: 'https://www.linkedin.com/feed/',
    topics: getRandomArray(topicNums),
    twitter: 'https://twitter.com/',
    experiences: getRandomExperiences(3),
    time_slots: getRandomTimeSlots(),
    top_mentor: getRandomBool(-0.3),
    countryCode: getRandom(countryCode),
  };

  return {
    userData,
    mentorData: mentor ? mentorData : undefined,
  };
};
