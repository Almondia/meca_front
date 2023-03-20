/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

import storage from '@/utils/storageHandler';

export const hasTokenState = atom<boolean>({
  key: 'hasTokenState',
  default: storage.getItem('token'),
});
