import { Types } from 'mongoose';
import {
  MentorSchemaType,
  UserSchemaType,
  DurationType,
  ExperienceType,
} from '../types';
import {
  companies,
  designations,
  expertise,
  images,
  languages,
  names,
  topicNums,
  descriptions,
  graduationYears,
  interests,
  streams,
  countryCode,
} from './fakeData';
import faker from '@faker-js/faker';
import moment from 'moment-timezone';

export const getRandom = <T>(array: T[]): T => {
  const idx = Math.floor(Math.random() * array.length);
  return array[idx];
};

export const getRandomBool = (offset = 0) =>
  Boolean(Math.max(0, Math.round(Math.random() + offset)));

const shuffleArray = <T>(array: T[]) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swapping 2 variables
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const getRandomArray = <T>(
  array: T[],
  upperBound = Infinity,
  lowerBound = 1,
) => {
  const k = Math.max(
    Math.min(Math.floor(Math.random() * array.length), upperBound),
    lowerBound,
  );

  const shuffledArray = shuffleArray(array);

  return shuffledArray.slice(0, k);
};

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const getRandomTimeSlots = (): DurationType[] => {
  const Days = [0, 1, 2, 3, 4, 5, 6];

  const timeSlots: DurationType[] = [];

  Days.forEach((day) => {
    const start_hour = Math.floor(Math.random() * 23);
    const start = new Date();
    const offsetStart = start.getDay() - day;
    start.setDate(start.getDate() - offsetStart);
    start.setHours(start_hour);
    const end_hour = start_hour === 23 ? 0 : start_hour + 1;
    const end = new Date();
    const offsetEnd = end.getDay() - day;
    end.setDate(end.getDate() - offsetEnd);
    end.setHours(end_hour);
    start.setMinutes(0);
    end.setMinutes(0);

    timeSlots.push({
      start,
      end,
      available: true,
    });
  });

  return timeSlots;
};

export const getRandomExperiences = (n: number): ExperienceType[] => {
  const experiences: ExperienceType[] = [];

  for (let i = 0; i < n; i++) {
    const start_date = new Date(
      new Date().getFullYear() - Math.ceil(Math.random() * 15),
    );
    const end_date = randomDate(start_date, new Date());
    const company = getRandom(companies);
    const role = getRandom(designations);

    experiences.push({
      company,
      role,
      start_year: start_date.getFullYear().toString(),
      end_year: end_date.getFullYear().toString(),
    });
  }

  return experiences;
};

// Const user_id = nanoid();
export const getUser = (user_id: string) => {
  const isMale = getRandomBool();

  const first_name = getRandom(isMale ? names.male : names.female);
  const last_name = getRandom(names.lastName);
  const image_link = getRandom(isMale ? images.male : images.female);
  const email = faker.internet.email(first_name, last_name);
  const oauth_provider = 'google';
  const is_mentor = getRandomBool();
  const signup_completed = true;
  const mentor_information = undefined;
  const bookings: Types.ObjectId[] = [];
  const create_time = randomDate(new Date(2021, 11, 8), new Date());
  const graduation_year = getRandom(graduationYears).toString();

  const user: UserSchemaType = {
    first_name,
    last_name,
    email,
    avatar: {
      url: image_link,
      filename: image_link.split('/').pop(),
    },
    oauth_provider,
    signup_completed,
    timezone: moment.tz.guess(),
    is_mentor,
    mentor_information,
    user_id,
    create_time,
    bookings,
    password: '',
    bio: getRandom(descriptions)[0],
    graduation_year,
    token: '',
    phone: faker.phone.phoneNumber(),
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
  return user;
};

export const getMentor = (
  user_id: string,
  first_name: string,
  last_name: string,
  image_link: string,
  email: string,
  phone: string,
  graduation_year: string,
): Partial<MentorSchemaType> => ({
  user_id,
  first_name,
  last_name,
  email,
  avatar: {
    url: image_link,
    filename: image_link.split('/').pop(),
  },
  phone,
  bio: getRandom(descriptions)[0],
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
});
