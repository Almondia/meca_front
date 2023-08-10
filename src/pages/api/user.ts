import { NextApiRequest, NextApiResponse } from 'next';

import nookies from 'nookies';

import { setAccessTokenFromServerRequest } from '@/apis/config/instance';
import userApi from '@/apis/userApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken } = nookies.get({ req });
  if (!accessToken) {
    return res.status(200).json(null);
  }
  setAccessTokenFromServerRequest(accessToken);
  try {
    const response = await userApi.getMe();
    return res.status(200).json({ ...response, accessToken });
  } catch {
    nookies.destroy({ res }, 'accessToken', {
      path: '/',
    });
    return res.status(401).json({
      message: '사용자 정보 조회 실패',
      status: 401,
    });
  }
}
