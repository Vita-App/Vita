import moment from 'moment-timezone';
import { AvailabilitySlots, DurationType, SlotType } from 'types';

export const commaString = (words: string[] | undefined) => {
  let result = '';
  if (typeof words === 'undefined') return result;

  for (const word of words) {
    result = result + word + ', ';
  }

  return result.slice(0, -2);
};

export const range = (from: number, to: number, step: number = 1) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

export const shuffleArray = <T>(array_: T[]) => {
  const array = [...array_];
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

const WeekDays: { [key: string]: number } = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export const transformSlots = (slots: AvailabilitySlots) =>
  Object.keys(slots).reduce((acc, day) => {
    if (!slots[day]) return [...acc];

    const daySlots = slots[day].map((s) => {
      const slot = s.value;
      let newStartDate: Date | null = null;
      let newEndDate: Date | null = null;

      if (slot.start) {
        newStartDate = new Date();
        newStartDate.setHours(slot.start.getHours());
        newStartDate.setMinutes(slot.start.getMinutes());

        const offsetDay: number = newStartDate.getDay() - WeekDays[day];
        newStartDate.setDate(newStartDate.getDate() - offsetDay);
      }

      if (slot.end) {
        newEndDate = new Date();
        newEndDate.setHours(slot.end.getHours());
        newEndDate.setMinutes(slot.end.getMinutes());

        const offsetDay: number = newEndDate.getDay() - WeekDays[day];
        newEndDate.setDate(newEndDate.getDate() - offsetDay);
      }

      return {
        start: newStartDate,
        end: newEndDate,
      };
    });

    return [...acc, ...daySlots];
  }, [] as SlotType[]);

export const getSlotsByDays = (
  slots: SlotType[],
  busySlots: Date[],
  _timeZone?: string,
) => {
  let timeZone: string;
  if (!_timeZone) {
    timeZone = moment.tz.guess();
  } else {
    timeZone = _timeZone;
  }

  let newSlots: Record<string, DurationType[]> = {};

  slots.forEach((slot) => {
    const momentStart = moment(slot.start);
    const momentEnd = moment(slot.end);
    momentStart.tz(timeZone);
    momentEnd.tz(timeZone);

    const day = momentStart.format('ddd');
    if (day in newSlots) {
      newSlots[day] = [
        ...newSlots[day],
        {
          start: momentStart,
          end: momentEnd,
        },
      ];
    } else {
      newSlots[day] = [
        {
          start: momentStart,
          end: momentEnd,
        },
      ];
    }
  });

  newSlots = filterBusy(newSlots, busySlots, timeZone);

  return newSlots;
};

// const getDays = (month: number, weekDay: number) => {
//   const days: Moment[] = [];

//   const firstDay = moment({ month }).startOf("month").day(weekDay);

//   console.log(firstDay.date());

//   if (firstDay.date() > 7) firstDay.add(7, 'd');

//   const _month = firstDay.month();
//   while (_month === firstDay.month()) {
//     days.push(firstDay);
//     firstDay.add(7, 'd');
//   }

//   return days;
// };

const filterBusy = (
  slots: Record<string, DurationType[]>,
  busySlots: Date[],
  timeZone: string,
) => {
  const newSlots: Record<number, DurationType[]> = {};

  const a = moment().startOf('month');
  const b = moment().endOf('month');

  for (const date = moment(a); date.isBefore(b); date.add(1, 'days')) {
    const daySlots = slots[date.format('ddd')];
    newSlots[date.date()] = daySlots?.filter((slot) => {
      const start = moment(slot.start);
      start.tz(timeZone);
      const isBusy = busySlots.find((_busySlot) => {
        const busySlot = moment(_busySlot);
        busySlot.tz(timeZone);

        if (
          busySlot.date() === date.date() &&
          busySlot.hours() === start.hours() &&
          busySlot.minutes() === start.minutes()
        ) {
          return true;
        }

        return false;
      });

      if (isBusy) return false;

      return true;
    });
  }

  return newSlots;
};

export const isObjectEmpty = (obj: any) => {
  if (!obj) return true;

  if (Array.isArray(obj) && obj.length === 0) return true;

  return Object.values(obj).every(
    (val: any) => !val || (Array.isArray(obj) && val.length === 0),
  );
};

export const addZero = (time: number) => {
  if (time > 9) return time;
  return '0' + time;
};

export const getDurationLabel = (duration: DurationType) =>
  `${addZero(duration.start.hours())}:${addZero(
    duration.start.minutes(),
  )} - ${addZero(duration.end.hours())}:${addZero(duration.end.minutes())}`;
