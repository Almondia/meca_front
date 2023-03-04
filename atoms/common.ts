import storage from '@/utils/storageHandler';
import { atom } from 'recoil';

export type ThemeType = 'light' | 'dark';

const themeState = atom<ThemeType>({
  key: 'themeState',
  default: storage.getItem('theme', 'light'),
});

export default themeState;
