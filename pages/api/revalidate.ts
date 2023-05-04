import { NextApiRequest, NextApiResponse } from 'next';

import nookies from 'nookies';

import { getJWTPayload, isValidJWT } from '@/utils/jwtHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method !== 'POST') {
    res.status(405).end({ message: 'not allowed method' });
    return;
  }
  const token = req.headers.authorization?.replace('Bearer ', '');
  const { accessToken } = nookies.get({ req });
  if (!token || !isValidJWT(token) || !accessToken) {
    res.status(304).json({ message: 'not revalidated' });
    return;
  }
  const requestUrl = getJWTPayload(token, 'url');
  if (!requestUrl) {
    res.status(304).json({ message: 'not revalidated' });
    return;
  }
  res.revalidate(requestUrl);
  res.status(200).json({ message: 'revalidated' });
}
