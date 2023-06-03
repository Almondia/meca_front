/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export const hasAuthState = atom<boolean>({
  key: 'hasAuthState',
  default: false,
});

export const isGlobalLoadingState = atom<boolean>({
  key: 'isGlobalLoadingState',
  default: false,
});
