import { rest } from 'msw';
import { authInstance } from '../../../apis/config/instance';
export const ENDPOINT = authInstance.defaults.baseURL + '/api/v1';
export const ENDPOINT_V2 = authInstance.defaults.baseURL + '/api/v2';

export const handlers = [];

/**
 * @param {function(any): {uri: string, method: string, responseResolver}} mockedApi - provide mocked[METHOD][NAME]Api callback function
 * @param {Object} [error] - if exists, mocked Api throw given error status
 * @param {number} [error.status=400] - default: 400
 * @param {string} [error.message="BAD_REQUEST"] - default: 'BAD_REQUEST'
 * @returns
 */
export const restHandler = (mockedApi, error) => {
  const { method, uri, responseResolver } = mockedApi();
  if (error) {
    return rest[method](uri, (_, res, ctx) => {
      return res(ctx.status(error.status ?? 400), ctx.json({ message: error.message ?? 'BAD_REQUEST' }));
    });
  }
  return rest[method](uri, responseResolver);
};

/**
 * @param {function(any): {uri: string, method: string, responseResolver}} mockedApi - provide mocked[METHOD][NAME]Api callback function
 * @param {Object | null} [responseBody]
 * @param {number} [status=200] - default: 200
 * @returns
 */
export const restOverridedResponseHandler = (mockedApi, responseBody, status = 200) => {
  const { method, uri } = mockedApi();
  return rest[method](uri, (req, res, ctx) => {
    return res(ctx.status(status), ctx.json(responseBody));
  });
};
