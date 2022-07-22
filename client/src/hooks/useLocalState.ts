import { Dispatch, SetStateAction, useState } from 'react';

const useLocalState = <S>(
  key: string,
  initialValue?: S,
): [S, Dispatch<SetStateAction<S>>] => {
  const [value, setValue] = useState<S>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setLocalState = (newValue: any) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setLocalState];
};

export default useLocalState;
