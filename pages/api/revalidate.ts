import { NextApiRequest, NextApiResponse } from 'next';

import nookies from 'nookies';

import { getJWTPayload } from '@/utils/jwtHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method?.toUpperCase() !== 'POST') {
    res.status(405).json({ message: 'not allowed method' });
    return;
  }
  const { accessToken } = nookies.get({ req });
  if (!accessToken && getJWTPayload(accessToken, 'id')) {
    res.status(304).json({ message: 'not revalidated' });
    return;
  }
  const { urls }: { urls: string[] } = await req.body;
  urls.forEach((url) => {
    res.revalidate(url);
  });
  res.status(200).json({ revalidated: true });
}
