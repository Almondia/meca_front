import type { NextApiResponse } from 'next';

import type { NextApiHandler, NextPartialQueryApiRequest } from '@/types/nextApi';

import ApiError from '../error/ApiError';
import { INTERNAL_SERVER_ERROR } from '../error/constants';

const withHandleError: <ReqType extends NextPartialQueryApiRequest>(
  nextApiHandler: NextApiHandler<ReqType>,
  errorCallback?: (req: NextPartialQueryApiRequest, res: NextApiResponse) => void,
) => NextApiHandler<ReqType> = (nextApiHandler, errorCallback) => async (req, res) => {
  try {
    return await nextApiHandler(req, res);
  } catch (error) {
    errorCallback?.(req, res);
    if (error instanceof ApiError) {
      return res.status(error.status).json(error);
    }
    // TODO: error logging;
    return res.status(500).json(INTERNAL_SERVER_ERROR);
  }
};

export default withHandleError;
