import type { NextApiResponse } from 'next';

import type { HttpMethod, NextApiHandler, NextPartialQueryApiRequest } from '@/types/nextApi';

import ApiError from '../error/ApiError';
import { INTERNAL_SERVER_ERROR, NOT_ALLOWED_METHOD } from '../error/constants';

const validHttpMethod = (method: string | undefined, allowedMethods: HttpMethod[]) =>
  (allowedMethods as string[]).includes(method?.toUpperCase() ?? '');

const withHandleError: <ReqType extends NextPartialQueryApiRequest>(
  availableMethods: HttpMethod[],
  nextApiHandler: NextApiHandler<ReqType>,
  errorCallback?: (req: NextPartialQueryApiRequest, res: NextApiResponse) => void,
) => NextApiHandler<ReqType> = (availableMethods, nextApiHandler, errorCallback) => async (req, res) => {
  try {
    if (!validHttpMethod(req.method, availableMethods)) {
      return res.status(405).json(NOT_ALLOWED_METHOD);
    }
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
