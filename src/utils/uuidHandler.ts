import { UUID_PATTERN } from '@/utils/constants';

export const combineUUID = (uuid1: string, uuid2: string) => `${uuid1}-${uuid2}`;

export const extractCombinedUUID = (uuid: string) => {
  if (!uuid.match(UUID_PATTERN)) {
    return { uuid1: '', uuid2: '' };
  }
  const uuid1 = uuid.slice(0, 36);
  const uuid2 = uuid.slice(37);
  return { uuid1, uuid2 };
};
