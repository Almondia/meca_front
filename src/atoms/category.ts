import { atom } from 'recoil';

export const sharedCategorySearcQueryState = atom<string>({
  key: 'sharedCategorySearcQueryState',
  default: '',
});
