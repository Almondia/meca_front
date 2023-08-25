import type { NextApiRequest, NextApiResponse } from 'next';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type NextPartialQueryApiRequest = Omit<NextApiRequest, 'query'>;

export type NextApiHandler<ReqType extends NextPartialQueryApiRequest> = (
  req: ReqType,
  res: NextApiResponse,
) => Promise<void>;
