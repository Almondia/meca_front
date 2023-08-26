import type { NextApiResponse } from 'next';
import type { NextPartialQueryApiRequest } from '@/types/nextApi';
import { createMocks, RequestOptions, ResponseOptions } from 'node-mocks-http';

export const mockedNextApiRequestResponse = <ReqType extends NextPartialQueryApiRequest>(
  reqOptions: RequestOptions,
  resOptions?: ResponseOptions,
) => {
  const { req, res }: { req: ReqType; res: NextApiResponse } = createMocks(reqOptions, resOptions);
  res.revalidate = (path: string): Promise<void> =>
    new Promise((resolve) => {
      resolve();
    });
  if (!req?.headers['Content-Type']) {
    req.headers = {
      'Content-Type': 'application/json',
    };
  }
  return { req, res } as { req: ReqType; res: NextApiResponse & { _getJSONData: () => object } };
};
