import { getPlaiceholder } from 'plaiceholder';

/* eslint-disable import/prefer-default-export */
export const getPlaceholderBlurImage = async (url: string, size: number) => {
  try {
    const { base64: blurDataURL, img } = await getPlaiceholder(url, { size });
    return { blurDataURL, img };
  } catch {
    return undefined;
  }
};
