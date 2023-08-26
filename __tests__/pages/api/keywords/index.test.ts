/**
 * @jest-environment node
 */
import handler from '@/pages/api/keywords/index';
import nookies from 'nookies';
import { mockedNextApiRequestResponse } from '@/mock/nodeMockHttpHandler';
import { NOT_ALLOWED_METHOD, NOT_AUTHORIZED, NOT_FOUND } from '@/apis/error/constants';
import { NextApiRequest } from 'next';
import userApi from '@/apis/userApi';
import ApiError from '@/apis/error/ApiError';
import { MOCK_MEMBER } from '@/mock/data';
import axios from 'axios';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

const mockedPostKeywordsResponse = {
  keyword: {
    hello: 1,
    world: 1,
  },
};

const mockedGetAllKeywordsResponse = {
  keywords: {
    hello: 4,
    abc: 5,
  },
};

describe('/api/keywords', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('[POST] 회원이 문장에 대한 키워드 목록 요청 시 [200: ok]를 응답한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const spyGetUser = jest.spyOn(userApi, 'getMe').mockResolvedValueOnce(MOCK_MEMBER);
    const spyPostKeywords = jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockedPostKeywordsResponse });
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({
      method: 'POST',
      body: { sentence: 'hello world' },
    });
    await handler(req, res);
    expect(spyGetUser).toHaveBeenCalledTimes(1);
    expect(spyPostKeywords).toHaveBeenCalledTimes(1);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res._getJSONData()).toEqual({ keywords: mockedPostKeywordsResponse.keyword });
    spyGetUser.mockClear();
    spyPostKeywords.mockClear();
  });

  it('[POST] 응답에 실패하면 해당 error를 응답한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const spyGetUser = jest.spyOn(userApi, 'getMe').mockResolvedValueOnce(MOCK_MEMBER);
    const spyPostKeywords = jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('error'));
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({
      method: 'POST',
      body: { sentence: 'hello world' },
    });
    await handler(req, res);
    expect(spyPostKeywords).toHaveBeenCalledTimes(1);
    expect(res).toHaveProperty('statusCode', 404);
    expect(res._getJSONData()).toEqual(NOT_FOUND);
    spyGetUser.mockClear();
    spyPostKeywords.mockClear();
  });

  it('[POST] 회원이 아닌 사용자 요청 시 [401: unauthorized]를 응답한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: '',
    });
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({
      method: 'POST',
      body: { sentence: 'hello world' },
    });
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 401);
    expect(res._getJSONData()).toEqual(NOT_AUTHORIZED);
  });

  it('[POST] 회원 정보 조회에 실패한 경우 해당 error를 응답한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const spyGetUser = jest.spyOn(userApi, 'getMe').mockRejectedValueOnce(new ApiError(NOT_AUTHORIZED));
    const spyPostKeywords = jest.spyOn(axios, 'post');
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({
      method: 'POST',
      body: { sentence: 'hello world' },
    });
    await handler(req, res);
    expect(spyPostKeywords).not.toHaveBeenCalled();
    expect(res).toHaveProperty('statusCode', 401);
    expect(res._getJSONData()).toEqual(NOT_AUTHORIZED);
    spyGetUser.mockClear();
    spyPostKeywords.mockClear();
  });

  it('[GET] 회원에 대한 모든 키워드 목록 조회 시 [200: ok]를 응답한다.', async () => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
    const spyGetUser = jest.spyOn(userApi, 'getMe').mockResolvedValueOnce(MOCK_MEMBER);
    const spyGetAllKeywords = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockedGetAllKeywordsResponse });
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({ method: 'GET' });
    await handler(req, res);
    expect(spyGetAllKeywords).toHaveBeenCalledTimes(1);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res._getJSONData()).toEqual(mockedGetAllKeywordsResponse);
    spyGetUser.mockClear();
    spyGetAllKeywords.mockClear();
  });

  it('잘못된 메서드로의 요청은 [405: method_not_allow]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<NextApiRequest>({ method: 'PUT' });
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 405);
    expect(res._getJSONData()).toEqual(NOT_ALLOWED_METHOD);
  });
});
