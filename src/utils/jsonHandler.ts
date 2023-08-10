// eslint-disable-next-line import/prefer-default-export
export const stringToJsonStringArrayConverter = (str: string): string[] => {
  try {
    const arr = JSON.parse(str);
    if (Array.isArray(arr) && arr.every((item) => typeof item === 'string')) {
      return arr;
    }
    throw new Error('Not a valid string array');
  } catch (err) {
    throw new Error('Error parsing string array');
  }
};
