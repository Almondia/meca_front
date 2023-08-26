/**
 * @jest-environment node
 */
import handler from '@/pages/api/cards/[cardId]/index';
import nookies from 'nookies';
import { mockedNextApiRequestResponse } from '@/mock/nodeMockHttpHandler';
import { NOT_ALLOWED_METHOD, NOT_FOUND } from '@/apis/error/constants';
import { authInstance } from '@/apis/config/instance';
import { MOCK_MECA } from '@/mock/data';
import ApiError from '@/apis/error/ApiError';
import mecaApi from '@/apis/mecaApi';
import { combineUUID } from '@/utils/uuidHandler';

jest.mock('nookies', () => ({
  get: jest.fn(),
}));

describe('/api/cards/[cardId]', () => {
  beforeEach(() => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('[PUT] 카드를 수정하면 revalidate를 수행하고 [200: ok]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof handler>[0]>({
      method: 'PUT',
      query: {
        cardId: MOCK_MECA.cardId,
      },
      body: MOCK_MECA,
    });
    const spyRevalidate = jest.spyOn(res, 'revalidate').mockImplementation(jest.fn());
    const spyPutCard = jest.spyOn(authInstance, 'put').mockResolvedValueOnce(MOCK_MECA);
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res._getJSONData()).toEqual(MOCK_MECA);
    expect(spyPutCard).toHaveBeenCalledTimes(1);
    expect(spyRevalidate).toHaveBeenCalledWith(`/meca/${combineUUID(MOCK_MECA.memberId, MOCK_MECA.cardId)}`, {
      unstable_onlyGenerated: true,
    });
    spyPutCard.mockClear();
    spyRevalidate.mockClear();
  });

  it('[DELETE] 공유된 카테고리의 마지막 카드 삭제인 경우 revalidate를 수행하고 [200: ok]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof handler>[0]>({
      method: 'DELETE',
      query: {
        cardId: MOCK_MECA.cardId,
        categoryId: MOCK_MECA.categoryId,
      },
    });
    const spyRevalidate = jest.spyOn(res, 'revalidate').mockImplementation(jest.fn());
    const spyPostCard = jest.spyOn(authInstance, 'delete').mockResolvedValueOnce(MOCK_MECA);
    const spyGetCategoryCardCount = jest
      .spyOn(mecaApi, 'getCountByCategoryId')
      .mockResolvedValueOnce({ shared: true, count: 0 });
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 200);
    expect(spyPostCard).toHaveBeenCalledTimes(1);
    expect(spyGetCategoryCardCount).toHaveBeenCalledWith(MOCK_MECA.categoryId);
    expect(spyRevalidate).toHaveBeenCalledWith('/');
    spyPostCard.mockClear();
    spyGetCategoryCardCount.mockClear();
    spyRevalidate.mockClear();
  });

  it('잘못된 메서드로의 요청은 [405: method_not_allow]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof handler>[0]>({ method: 'GET' });
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 405);
    expect(res._getJSONData()).toEqual(NOT_ALLOWED_METHOD);
  });
});
