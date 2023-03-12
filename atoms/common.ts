import { atom } from 'recoil';

import storage from '@/utils/storageHandler';

export type ThemeType = 'light' | 'dark';

export const themeState = atom<ThemeType>({
  key: 'themeState',
  default: storage.getItem('theme', 'light'),
});

export const hasTokenState = atom<boolean>({
  key: 'hasTokenState',
  default: storage.getItem('token'),
});
