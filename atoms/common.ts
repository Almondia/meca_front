/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export const hasAuthState = atom<boolean>({
  key: 'hasAuthState',
  default: false,
});
