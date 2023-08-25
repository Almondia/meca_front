import { NextApiRequest, NextApiResponse } from 'next';

import nookies from 'nookies';

import withAllowedMethod from '@/apis/nextApiWrapper/withAllowedMethod';
import withAuthentication from '@/apis/nextApiWrapper/withAuthentication';
import withHandleError from '@/apis/nextApiWrapper/withHandleError';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  nookies.destroy({ res }, 'accessToken', {
    path: '/',
  });
  return res.status(200).json({
    deleted: true,
  });
};

export default withAllowedMethod(['POST'], withHandleError(withAuthentication(handler)));
