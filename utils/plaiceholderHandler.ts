import { getPlaiceholder } from 'plaiceholder';

import { createQueryString } from './queryStringHandler';

const NEXT_ORIGIN = process.env.NEXT_ORIGIN ?? 'http://127.0.0.1:3000';

export const getNextImageUrl = (imageSrc: string) =>
  `${NEXT_ORIGIN}/_next/image${createQueryString({ url: imageSrc, w: '322', q: '75' })}`;

export const getPlaceholderImage = async (src: string, size: number) => {
  try {
    const { base64: blurDataURL, img } = await getPlaiceholder(src, { size });
    return { blurDataURL, img };
  } catch (e) {
    return undefined;
  }
};
