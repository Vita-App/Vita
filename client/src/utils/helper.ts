import { SlotType } from 'types';

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

export const transformSlots = (slots: any) => {
  console.log(slots);
  return Object.keys(slots).reduce((acc, day) => {
    let daySlots = slots[day] as SlotType[];

    daySlots = daySlots.map((slot) => {
      let newStartDate: Date | null = null;
      let newEndDate: Date | null = null;

      if (slot.start) {
        newStartDate = new Date();
        newStartDate.setHours(slot.start.getHours());
        newStartDate.setMinutes(slot.start.getMinutes());

        let offsetDay: number = newStartDate.getDay() - WeekDays[day];
        newStartDate.setDate(newStartDate.getDate() - offsetDay);
      }

      if (slot.end) {
        newEndDate = new Date();
        newEndDate.setHours(slot.end.getHours());
        newEndDate.setMinutes(slot.end.getMinutes());

        let offsetDay: number = newEndDate.getDay() - WeekDays[day];
        newEndDate.setDate(newEndDate.getDate() - offsetDay);
      }

      return {
        id: slot.id,
        start: newStartDate,
        end: newEndDate,
      };
    });

    return [...acc, ...daySlots];
  }, [] as SlotType[]);
};
