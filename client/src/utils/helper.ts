/* eslint-disable no-bitwise */
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
