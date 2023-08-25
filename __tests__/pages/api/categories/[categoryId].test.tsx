/**
 * @jest-environment node
 */
import categoryHandler from '@/pages/api/categories/[categoryId]';
import nookies from 'nookies';
import { mockedNextApiRequestResponse } from '@/mock/handlers';
import { NOT_ALLOWED_METHOD } from '@/apis/error/constants';
import { authInstance } from '@/apis/config/instance';
import { MOCK_CATEGORY, MOCK_CATEGORY_ID } from '@/mock/data';
import ApiError from '@/apis/error/ApiError';

jest.mock('nookies', () => ({
  get: jest.fn(),
  destroy: jest.fn(),
}));

describe('/api/categories/[categoryId]', () => {
  beforeEach(() => {
    (nookies.get as jest.Mock).mockReturnValue({
      accessToken: 'token',
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('[PUT] 공유된 카테고리 수정 요청 시 revalidate를 수행하고 [200: ok]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof categoryHandler>[0]>({
      method: 'PUT',
      query: {
        categoryId: MOCK_CATEGORY_ID,
      },
      body: MOCK_CATEGORY,
    });
    const spyRevalidate = jest.spyOn(res, 'revalidate').mockImplementation(jest.fn());
    const spyPutCategory = jest.spyOn(authInstance, 'put').mockResolvedValueOnce(MOCK_CATEGORY);
    await categoryHandler(req, res);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res._getJSONData()).toEqual(MOCK_CATEGORY);
    expect(spyPutCategory).toHaveBeenCalledTimes(1);
    expect(spyRevalidate).toHaveBeenCalledWith('/');
    spyRevalidate.mockClear();
    spyPutCategory.mockClear();
  });

  it('[PUT] 수정 요청 api 호출에서 응답에 실패할 경우 error 응답을 그대로 리턴한다', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof categoryHandler>[0]>({
      method: 'PUT',
      query: {
        categoryId: MOCK_CATEGORY_ID,
      },
      body: MOCK_CATEGORY,
    });
    const spyPutCategory = jest
      .spyOn(authInstance, 'put')
      .mockRejectedValueOnce(new ApiError({ status: 400, message: 'bad_request' }));
    await categoryHandler(req, res);
    expect(res).toHaveProperty('statusCode', 400);
    expect(res._getJSONData()).toEqual({ status: 400, message: 'bad_request' });
    expect(spyPutCategory).toHaveBeenCalledTimes(1);
    spyPutCategory.mockClear();
  });

  it('[DELETE] 공유된 카테고리 삭제 요청 시 revalidate를 수행하고 [200: ok]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof categoryHandler>[0]>({
      method: 'DELETE',
      query: {
        categoryId: MOCK_CATEGORY_ID,
        shared: '1',
      },
    });
    const spyDeleteCategory = jest.spyOn(authInstance, 'delete').mockResolvedValueOnce({ deleted: true });
    const spyRevalidate = jest.spyOn(res, 'revalidate').mockImplementation(jest.fn());
    await categoryHandler(req, res);
    expect(res).toHaveProperty('statusCode', 200);
    expect(res._getJSONData()).toHaveProperty('deleted', true);
    expect(spyDeleteCategory).toHaveBeenCalledTimes(1);
    expect(spyRevalidate).toHaveBeenCalledWith('/');
    spyDeleteCategory.mockClear();
    spyRevalidate.mockClear();
  });

  it('잘못된 메서드로의 요청은 [405: method_not_allow]를 응답한다.', async () => {
    const { req, res } = mockedNextApiRequestResponse<Parameters<typeof categoryHandler>[0]>({ method: 'GET' });
    await categoryHandler(req, res);
    expect(res).toHaveProperty('statusCode', 405);
    expect(res._getJSONData()).toEqual(NOT_ALLOWED_METHOD);
  });
});
