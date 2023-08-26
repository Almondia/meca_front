/**
 * @jest-environment node
 */
import logoutHandler from '@/pages/api/users/logout';
import nookies from 'nookies';
import { mockedNextApiRequestResponse } from '@/mock/nodeMockHttpHandler';
import { NOT_ALLOWED_METHOD, NOT_AUTHORIZED } from '@/apis/error/constants';
import { NextApiRequest } from 'next';

jest.mock('nookies', () => ({
  get: jest.fn(),
  destroy: jest.fn(),
}));

describe('/api/logout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('cookie에 acceess token이 존재한다면 삭제하고 [200: ok]를 응답한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({ method: 'POST' });
    await logoutHandler(req, res);
    expect(res).toHaveProperty('statusCode', 200);
    expect(nookies.destroy).toHaveBeenCalledWith({ res }, 'accessToken', { path: '/' });
    expect(res._getJSONData()).toHaveProperty('deleted', true);
  });

  it('cookie에 access token이 존재하지 않는다면 [401: unauthorized]를 응답한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: undefined,
    });
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({ method: 'POST' });
    await logoutHandler(req, res);
    expect(res).toHaveProperty('statusCode', 401);
    expect(nookies.destroy).not.toHaveBeenCalled();
    expect(res._getJSONData()).toEqual(NOT_AUTHORIZED);
  });

  it('잘못된 메서드로의 요청은 [405: method_not_allow]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({ method: 'GET' });
    await logoutHandler(req, res);
    expect(res).toHaveProperty('statusCode', 405);
    expect(res._getJSONData()).toEqual(NOT_ALLOWED_METHOD);
  });
});
