import { NextApiRequest, NextApiResponse } from 'next';

import nookies from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method !== 'POST') {
    res.status(405).json({ message: '잘못된 http method 요청', status: 405 });
    return;
  }
  const { accessToken } = nookies.get({ req });
  if (accessToken) {
    nookies.destroy({ res }, 'accessToken', {
      path: '/',
    });
  }
  res.status(200).json({
    deleted: true,
  });
}
