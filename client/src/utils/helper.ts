export const commaString = (words: string[]) => {
  let result = '';

  for (const word of words) {
    result = result + word + ', ';
  }

  return result.slice(0, -2);
};
