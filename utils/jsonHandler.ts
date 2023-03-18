// eslint-disable-next-line import/prefer-default-export
export const stringToJsonStringArrayConverter = (str: string) => {
  try {
    const arr = JSON.parse(JSON.stringify(str));
    if (Array.isArray(arr) && arr.every((item) => typeof item === 'string')) {
      return arr;
    }
    throw new Error('Not a valid string array');
  } catch (err) {
    console.error('Error parsing string array', err);
    return [];
  }
};
