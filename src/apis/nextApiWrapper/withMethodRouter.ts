import { NextApiResponse } from 'next';

import type { HttpMethod, NextApiHandler, NextPartialQueryApiRequest } from '@/types/nextApi';

import ApiError from '@/apis/error/ApiError';
import { NOT_ALLOWED_METHOD } from '@/apis/error/constants';

export const withMethodRouter = <ReqType extends NextPartialQueryApiRequest>(
  req: ReqType,
  res: NextApiResponse,
  methodRouteStrategy: Partial<Record<HttpMethod, NextApiHandler<ReqType>>>,
) => {
  const { method } = req as { method: HttpMethod };
  const handler = methodRouteStrategy[method];
  if (handler) {
    return handler(req, res);
  }
  throw new ApiError(NOT_ALLOWED_METHOD);
};
