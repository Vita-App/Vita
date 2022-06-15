import { atom } from 'recoil';
import { UserType } from 'types';

export const authState = atom<{
  isLoggedIn: boolean;
  user: UserType | null;
  message: string;
}>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    user: null,
    message: 'User is not logged in',
  },
});
