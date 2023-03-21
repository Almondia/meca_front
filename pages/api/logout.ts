import { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = nookies.get({ req });
  if (!accessToken) {
    res.status(200).json({
      deleted: false,
    });
    return;
  }
  nookies.destroy({ res }, 'accessToken', {
    path: '/',
  });
  res.status(200).json({
    deleted: true,
  });
}
