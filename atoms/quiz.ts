/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export const quizTimeState = atom<number>({
  key: 'quizTimeState',
  default: undefined,
});

export const quizTitleState = atom<string>({
  key: 'quizTitleState',
  default: '',
});
