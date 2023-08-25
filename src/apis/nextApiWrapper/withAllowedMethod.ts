import type { HttpMethod, NextApiHandler, NextPartialQueryApiRequest } from '@/types/nextApi';

import { NOT_ALLOWED_METHOD } from '../error/constants';

const validHttpMethod = (method: string | undefined, allowedMethods: HttpMethod[]) =>
  (allowedMethods as string[]).includes(method?.toUpperCase() ?? '');

const withAllowedMethod: <ReqType extends NextPartialQueryApiRequest>(
  availableMethods: HttpMethod[],
  nextApiHandler: NextApiHandler<ReqType>,
) => NextApiHandler<ReqType> = (availableMethods, nextApiHandler) => async (req, res) => {
  if (!validHttpMethod(req.method, availableMethods)) {
    return res.status(405).json(NOT_ALLOWED_METHOD);
  }
  return nextApiHandler(req, res);
};

export default withAllowedMethod;
