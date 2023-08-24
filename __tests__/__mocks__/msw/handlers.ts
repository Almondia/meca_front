import { DefaultBodyType, MockedResponse, PathParams, ResponseComposition, rest, RestContext, RestRequest } from 'msw';
import { authInstance } from '@/apis/config/instance';
export const ENDPOINT = authInstance.defaults.baseURL + '/api/v1';
export const ENDPOINT_V2 = authInstance.defaults.baseURL + '/api/v2';

export const handlers = [];

export interface ErrorResponse {
  status?: number;
  message?: string;
}

export type Method = 'get' | 'post' | 'put' | 'delete';

export type ResponseResolver = (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext,
) => Promise<MockedResponse<DefaultBodyType>>;

export interface MockedApiResponse {
  uri: string;
  method: string;
  responseResolver: ResponseResolver;
}

export const mockedGetUserWithServerApi = (body = '') => {
  const [uri, method] = ['/api/user', 'get'];
  const responseResolver: ResponseResolver = async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(body));
  };
  return { uri, method, responseResolver };
};

export const restHandler = (mockedApi: () => MockedApiResponse, error?: ErrorResponse) => {
  const { method, uri, responseResolver } = mockedApi();
  if (error) {
    return rest[method as Method](uri, (_, res, ctx) => {
      return res(ctx.status(error.status ?? 400), ctx.json({ message: error.message ?? 'BAD_REQUEST' }));
    });
  }
  return rest[method as Method](uri, responseResolver);
};

export const restOverridedResponseHandler = <BodyType extends any>(
  mockedApi: () => MockedApiResponse,
  responseBody: BodyType,
  status = 200,
) => {
  const { method, uri } = mockedApi();
  return rest[method as Method](uri, (_, res, ctx) => {
    return res(ctx.status(status), ctx.json(responseBody as unknown as any));
  });
};

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestOptions, ResponseOptions } from 'node-mocks-http';

export const mockedNextApiFetch = async (
  handler: NextApiHandler,
  reqOptions: RequestOptions,
  resOptions?: ResponseOptions,
) => {
  const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks(reqOptions, resOptions);
  if (!req?.headers['Content-Type']) {
    req.headers = {
      'Content-Type': 'application/json',
    };
  }
  await handler(req, res);
  return res as NextApiResponse & { _getJSONData: () => object };
};
