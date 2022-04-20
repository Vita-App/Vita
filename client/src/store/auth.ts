import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    isLoggedIn: false,
    user: null,
    message: 'User is not logged in',
  },
});
