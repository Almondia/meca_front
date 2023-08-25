/**
 * @jest-environment node
 */
import handler from '@/pages/api/users/index';
import nookies from 'nookies';
import { mockedNextApiRequestResponse } from '@/mock/handlers';
import { NOT_ALLOWED_METHOD, NOT_AUTHORIZED } from '@/apis/error/constants';
import { NextApiRequest } from 'next';
import userApi from '@/apis/userApi';
import { MOCK_MEMBER } from '@/mock/data';
import ApiError from '@/apis/error/ApiError';

jest.mock('nookies', () => ({
  get: jest.fn(),
  destroy: jest.fn(),
}));

describe('/api/users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('[GET] cookie에 acceess token이 존재한다면 회원정보를 조회하여 [200: ok]를 응답한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const spyGetUser = jest.spyOn(userApi, 'getMe').mockResolvedValueOnce(MOCK_MEMBER);
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({ method: 'GET' });
    await handler(req, res);
    expect(spyGetUser).toHaveBeenCalledTimes(1);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res._getJSONData()).toEqual(MOCK_MEMBER);
    spyGetUser.mockClear();
  });

  it('[GET] cookie에 access token이 존재하지 않는다면 [200: ok]와 함께 null을 응답한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: undefined,
    });
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({ method: 'GET' });
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res._getJSONData()).toEqual(null);
  });

  it('[GET] 회원 정보 조회 실패 시 error 응답과 함께 토큰을 삭제한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({ method: 'GET' });
    const spyGetUser = jest.spyOn(userApi, 'getMe').mockRejectedValueOnce(new ApiError(NOT_AUTHORIZED));
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 401);
    expect(res._getJSONData()).toEqual(NOT_AUTHORIZED);
    expect(nookies.destroy).toHaveBeenCalledWith({ res }, 'accessToken', { path: '/' });
    spyGetUser.mockClear();
  });

  it('잘못된 메서드로의 요청은 [405: method_not_allow]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({ method: 'POST' });
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 405);
    expect(res._getJSONData()).toEqual(NOT_ALLOWED_METHOD);
  });
});
