import type { NextApiRequest, NextApiResponse } from 'next';

import nookies from 'nookies';

import { NextApiHandler, NextPartialQueryApiRequest } from '@/types/nextApi';

import { setAccessTokenFromServerRequest } from '@/apis/config/instance';
import ApiError from '@/apis/error/ApiError';
import { NOT_AUTHORIZED } from '@/apis/error/constants';

const withAuthentication: <ReqType extends NextPartialQueryApiRequest>(
  nextApiHandler: NextApiHandler<ReqType>,
  isThrowable?: boolean,
) => NextApiHandler<ReqType> =
  (nextApiHandler, isThrowable = true) =>
  async (req, res) => {
    const { accessToken } = nookies.get({ req });
    if (accessToken) {
      setAccessTokenFromServerRequest(accessToken);
      return nextApiHandler(req, res);
    }
    if (isThrowable) {
      throw new ApiError(NOT_AUTHORIZED);
    }
    return res.status(200).json(null);
  };

export default withAuthentication;
