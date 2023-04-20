export const combineUUID = (uuid1: string, uuid2: string) => `${uuid1}-${uuid2}`;

// TODO: UUID validator 추가
export const extractCombinedUUID = (uuid: string) => {
  if (uuid.length !== 73) {
    return { uuid: '', uuid2: '' };
  }
  if (uuid.indexOf('-', 36) !== 36) {
    return { uuid: '', uuid2: '' };
  }
  const uuid1 = uuid.slice(0, 36);
  const uuid2 = uuid.slice(37);
  if (uuid1.length !== 36 || uuid2.length !== 36) {
    return { uuid: '', uuid2: '' };
  }
  return { uuid1, uuid2 };
};
