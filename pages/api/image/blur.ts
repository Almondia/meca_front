import { NextApiRequest, NextApiResponse } from 'next';

import { getPlaiceholder } from 'plaiceholder';

import logger from '@/libs/logger';
import { IMMUTABLE_CDN_CACHE_VALUE } from '@/utils/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method !== 'GET') {
    return res.status(405).json({ message: '잘못된 http method 요청', status: 405 });
  }
  const { url } = req.query;
  if (typeof url !== 'string' || !url.startsWith(process.env.NEXT_PUBLIC_REMOTE_IMAGE_URL ?? '')) {
    logger.error({
      requestType: 'API',
      location: '/api/image/blur',
      tag: 'ERROR',
      message: `잘못된 이미지 url 요청 with '${url}'`,
    });
    return res.status(400).json({ message: '잘못된 이미지 url 요청', status: 400 });
  }
  try {
    const { base64: blurDataURL, img } = await getPlaiceholder(url, { size: 20 });
    res.setHeader('Cache-Control', IMMUTABLE_CDN_CACHE_VALUE);
    logger.info({
      requestType: 'API',
      location: '/api/image/blur',
      tag: 'SUCCESS',
      message: `'${url}' blur image created`,
    });
    return res.status(200).json({
      blurDataURL,
      img,
    });
  } catch (e) {
    logger.error({
      requestType: 'API',
      location: '/api/image/blur',
      tag: 'ERROR',
      message: `blur 이미지 생성 실패 with '${url}', cause: ${JSON.stringify(e)}`,
    });
    return res.status(500).json({ message: 'blur 이미지 생성 실패', status: 500 });
  }
}
