/**
 * @jest-environment node
 */
import handler from '@/pages/api/cards/[cardId]/share';
import nookies from 'nookies';
import { mockedNextApiRequestResponse } from '@/mock/handlers';
import { NOT_ALLOWED_METHOD } from '@/apis/error/constants';
import { unauthInstance } from '@/apis/config/instance';
import { MOCK_MECA, MOCK_MECA_ID, MOCK_MEMBER_ID } from '@/mock/data';
import { combineUUID } from '@/utils/uuidHandler';
import ApiError from '@/apis/error/ApiError';

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

  it('[GET] 공유 카드 조회 요청에 대해 [200: ok]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof handler>[0]>({
      method: 'GET',
      query: {
        cardId: MOCK_MECA_ID,
        memberId: MOCK_MEMBER_ID,
      },
    });
    const spyGetSharedCard = jest.spyOn(unauthInstance, 'get').mockResolvedValueOnce(MOCK_MECA);
    await handler(req, res);
    expect(req.query).toHaveProperty('cardId', MOCK_MECA_ID);
    expect(req.query).toHaveProperty('memberId', MOCK_MEMBER_ID);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res._getJSONData()).toEqual(MOCK_MECA);
    expect(spyGetSharedCard).toHaveBeenCalledTimes(1);
    spyGetSharedCard.mockClear();
  });

  it('[GET] 공유 카드 조회 요청에 대해 응답에 실패할 경우 error 응답을 리턴하고 revalidate를 수행한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof handler>[0]>({
      method: 'GET',
      query: {
        cardId: MOCK_MECA_ID,
        memberId: MOCK_MEMBER_ID,
      },
      body: MOCK_MECA,
    });
    const spyRevalidate = jest.spyOn(res, 'revalidate').mockImplementation(jest.fn());
    const spyGetSharedCard = jest
      .spyOn(unauthInstance, 'get')
      .mockRejectedValueOnce(new ApiError({ status: 403, message: 'access denied' }));
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 403);
    expect(res._getJSONData()).toEqual({ status: 403, message: 'access denied' });
    expect(spyGetSharedCard).toHaveBeenCalledTimes(1);
    expect(spyRevalidate).toHaveBeenCalledWith(`/mecas/${combineUUID(MOCK_MEMBER_ID, MOCK_MECA_ID)}`, {
      unstable_onlyGenerated: true,
    });
    spyGetSharedCard.mockClear();
    spyRevalidate.mockClear();
  });

  it('잘못된 메서드로의 요청은 [405: method_not_allow]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof handler>[0]>({ method: 'POST' });
    await handler(req, res);
    expect(res).toHaveProperty('statusCode', 405);
    expect(res._getJSONData()).toEqual(NOT_ALLOWED_METHOD);
  });
});
