/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

import { QuizPhase } from '@/types/domain/quiz';

export const quizTimeState = atom<number>({
  key: 'quizTimeState',
  default: undefined,
});

export const quizTitleState = atom<string>({
  key: 'quizTitleState',
  default: '',
});

export const quizPhaseState = atom<QuizPhase>({
  key: 'quizPhaseState',
  default: 'progress',
});
