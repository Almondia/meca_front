import { NextApiRequest, NextApiResponse } from 'next';

import nookies from 'nookies';

import withAllowedMethod from '@/apis/nextApiWrapper/withAllowedMethod';
import withAuthentication from '@/apis/nextApiWrapper/withAuthentication';
import withHandleError from '@/apis/nextApiWrapper/withHandleError';
import userApi from '@/apis/userApi';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await userApi.getMe();
  const { accessToken } = nookies.get({ req });
  return res.status(200).json({ ...response, accessToken });
};

export default withAllowedMethod(
  ['GET'],
  withHandleError(withAuthentication(handler, false), (_, res) =>
    nookies.destroy({ res }, 'accessToken', {
      path: '/',
    }),
  ),
);
