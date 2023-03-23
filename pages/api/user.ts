import { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';

import userApi from '@/apis/userApi';
import { MyProfile } from '@/types/domain';
import { AxiosErrorResponse, setRequest } from '@/apis/config/instance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MyProfile | AxiosErrorResponse | null>,
) {
  const { accessToken } = nookies.get({ req });
  if (!accessToken) {
    res.status(200).json(null);
    return;
  }
  setRequest(req);
  try {
    const response = await userApi.getMe();
    res.setHeader('access-token', accessToken);
    res.status(200).json(response);
    return;
  } catch {
    nookies.destroy({ res }, 'accessToken', {
      path: '/',
    });
    res.status(401).json({
      message: '사용자 정보 조회 실패',
      status: 401,
    });
  }
}
