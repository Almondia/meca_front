/**
 * @jest-environment node
 */
import addCardHandler from '@/pages/api/cards/index';
import nookies from 'nookies';
import { mockedNextApiRequestResponse } from '@/mock/nodeMockHttpHandler';
import { NOT_ALLOWED_METHOD, NOT_FOUND } from '@/apis/error/constants';
import { authInstance } from '@/apis/config/instance';
import { MOCK_MECA } from '@/mock/data';
import ApiError from '@/apis/error/ApiError';
import mecaApi from '@/apis/mecaApi';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('/api/cards', () => {
  beforeEach(() => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('[POST] 공유된 카테고리에 첫 카드 등록일 경우 revalidate를 수행하고 [200: ok]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof addCardHandler>[0]>({
      method: 'POST',
      body: MOCK_MECA,
    });
    const spyRevalidate = jest.spyOn(res, 'revalidate').mockImplementation(jest.fn());
    const spyPostCard = jest.spyOn(authInstance, 'post').mockResolvedValueOnce(MOCK_MECA);
    const spyGetCategoryCardCount = jest
      .spyOn(mecaApi, 'getCountByCategoryId')
      .mockResolvedValueOnce({ shared: true, count: 1 });
    await addCardHandler(req, res);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res._getJSONData()).toEqual(MOCK_MECA);
    expect(spyPostCard).toHaveBeenCalledTimes(1);
    expect(spyGetCategoryCardCount).toHaveBeenCalledWith(MOCK_MECA.categoryId);
    expect(spyRevalidate).toHaveBeenCalledWith('/');
    spyPostCard.mockClear();
    spyGetCategoryCardCount.mockClear();
    spyRevalidate.mockClear();
  });

  it('[POST] 공유되지 않은 카테고리에 대한 카드 등록일 경우 revalidate를 수행하지 않고 [200: ok]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof addCardHandler>[0]>({
      method: 'POST',
      body: MOCK_MECA,
    });
    const spyRevalidate = jest.spyOn(res, 'revalidate').mockImplementation(jest.fn());
    const spyPostCard = jest.spyOn(authInstance, 'post').mockResolvedValueOnce(MOCK_MECA);
    const spyGetCategoryCardCount = jest
      .spyOn(mecaApi, 'getCountByCategoryId')
      .mockResolvedValueOnce({ shared: false, count: 1 });
    await addCardHandler(req, res);
    expect(res).toHaveProperty('statusCode', 200);
    expect(spyPostCard).toHaveBeenCalledTimes(1);
    expect(spyGetCategoryCardCount).toHaveBeenCalledWith(MOCK_MECA.categoryId);
    expect(spyRevalidate).not.toHaveBeenCalled();
    spyPostCard.mockClear();
    spyGetCategoryCardCount.mockClear();
    spyRevalidate.mockClear();
  });

  it('[POST] 카테고리 api 호출에 에러가 발생해도 카드 등록에 성공하면 [200: ok]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof addCardHandler>[0]>({
      method: 'POST',
      body: MOCK_MECA,
    });
    const spyPostCard = jest.spyOn(authInstance, 'post').mockResolvedValueOnce(MOCK_MECA);
    const spyGetCategoryCardCount = jest
      .spyOn(mecaApi, 'getCountByCategoryId')
      .mockRejectedValueOnce(new ApiError(NOT_FOUND));
    await addCardHandler(req, res);
    expect(res).toHaveProperty('statusCode', 200);
    expect(spyPostCard).toHaveBeenCalledTimes(1);
    expect(spyGetCategoryCardCount).toHaveBeenCalledWith(MOCK_MECA.categoryId);
    spyPostCard.mockClear();
    spyGetCategoryCardCount.mockClear();
  });

  it('[POST] 등록 요청에서 api 응답에 실패할 경우 error 응답을 리턴한다', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof addCardHandler>[0]>({
      method: 'POST',
      body: MOCK_MECA,
    });
    const spyPostCard = jest.spyOn(authInstance, 'post').mockRejectedValueOnce(new ApiError(NOT_FOUND));
    await addCardHandler(req, res);
    expect(res).toHaveProperty('statusCode', 404);
    expect(spyPostCard).toHaveBeenCalledTimes(1);
    spyPostCard.mockClear();
  });

  it('잘못된 메서드로의 요청은 [405: method_not_allow]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof addCardHandler>[0]>({ method: 'GET' });
    await addCardHandler(req, res);
    expect(res).toHaveProperty('statusCode', 405);
    expect(res._getJSONData()).toEqual(NOT_ALLOWED_METHOD);
  });
});
