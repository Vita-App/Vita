import {
  MentorSchemaType,
  TopicSchemaType,
  UserSchemaType,
  DurationType,
  DayEnumType,
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
} from './fakeData';
import faker from 'faker';
const ENTRIES = 100;

const getRandom = <T>(array: T[]): T => {
  const idx = Math.floor(Math.random() * array.length);
  return array[idx];
};

const getRandomBool = (offset: number = 0) =>
  Boolean(Math.max(0, Math.round(Math.random() + offset)));

const shuffleArray = <T>(array: T[]) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swapping 2 variables
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const getRandomArray = <T>(
  array: T[],
  upperBound: number = Infinity,
  lowerBound: number = 1,
) => {
  const k = Math.max(
    Math.min(Math.floor(Math.random() * array.length), upperBound),
    lowerBound,
  );

  const shuffledArray = shuffleArray(array);

  return shuffledArray.slice(0, k);
};

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

const getRandomTimeSlots = (): Record<DayEnumType, DurationType> => {
  const Days: DayEnumType[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  let timeSlots: Record<DayEnumType, DurationType> = {} as Record<
    DayEnumType,
    DurationType
  >;

  Days.forEach((day) => {
    const start_hour = Math.floor(Math.random() * 23);
    const end_hour = Math.min(23, start_hour + Math.ceil(Math.random() * 4));
    timeSlots[day] = {
      start_hour,
      end_hour,
      available: getRandomBool(-0.1),
      locale: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  });

  return timeSlots;
};

// const user_id = nanoid();
export const getUser = (user_id: string) => {
  const isMale = getRandomBool();

  const first_name = getRandom(isMale ? names.male : names.female);
  const last_name = getRandom(names.lastName);
  const image_link = getRandom(isMale ? images.male : images.female);
  const email = faker.internet.email(first_name, last_name);
  const oauth_provider = 'google';
  const is_mentor = getRandomBool();
  const signup_completed = getRandomBool();
  const mentor_information = undefined;
  const bookings: any[] = [];
  const create_time = randomDate(new Date(2021, 11, 8), new Date());
  const user: UserSchemaType = {
    first_name,
    last_name,
    email,
    image_link,
    oauth_provider,
    signup_completed,
    is_mentor,
    mentor_information,
    user_id,
    create_time,
    bookings,
  };
  return user;
};

export const getMentor = (
  user_id: string,
  first_name: string,
  last_name: string,
  image_link: string,
): MentorSchemaType => {
  return {
    user_id,
    first_name,
    last_name,
    image_link,
    job_title: getRandom(designations),
    company: getRandom(companies),
    expertise: getRandomArray(expertise),
    description: getRandom(descriptions),
    is_mentoring: getRandomBool(0.3),
    language: ['English', ...getRandomArray(languages, 1)],
    linkedIn: 'https://www.linkedin.com/feed/',
    topics: getRandomArray(topicNums),
    time_slot: getRandomTimeSlots(),
  };
};
