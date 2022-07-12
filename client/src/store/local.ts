import { atom } from 'recoil';
import { MentorSchemaType } from 'types';
import { swipeCardsInfo } from 'data';
import moment from 'moment-timezone';

export const motivationState = atom<unknown>({
  key: 'motivationState',
  default: null,
});

export const expertiseState = atom<unknown>({
  key: 'expertiseState',
  default: null,
});

export const tabIndexState = atom<string>({
  key: 'tabIndex',
  default: '1',
});

export const topicState = atom<number>({
  key: 'topicState',
  default: -1,
});

export const mentorState = atom<MentorSchemaType>({
  key: 'mentorState',
  default: {} as MentorSchemaType,
});

export const swipeCardState = atom<number>({
  key: 'swipeCardState',
  default: swipeCardsInfo.length - 1,
});

export const timeZoneState = atom<{ value: string; label: string }>({
  key: 'timezone',
  default: {
    value: moment.tz.guess(),
    label: moment.tz.guess(),
  },
});
