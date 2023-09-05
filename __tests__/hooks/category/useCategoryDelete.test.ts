import { createQueryClientWrapper } from '../../utils';

import { renderHook, waitFor } from '@testing-library/react';
import { implementServer } from '@/mock/server';
import { mockedDeleteCategoryApi } from '@/mock/api';
import { restHandler } from '@/mock/handlers';
import { MOCK_CATEGORY_ID } from '@/mock/data';

import alertToast from '@/utils/toastHandler';
import useCategoryDelete from '@/hooks/category/useCategoryDelete';

jest.mock('@/utils/toastHandler', () => {
  return jest.fn();
});

describe('useCategoryDelete', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('category 삭제 시 성공 toast가 식별된다.', async () => {
    (alertToast as jest.Mock).mockReturnValueOnce(jest.fn());
    implementServer([restHandler(mockedDeleteCategoryApi)]);
    const { result } = renderHook(() => useCategoryDelete(), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      result.current.deleteCategory({ id: MOCK_CATEGORY_ID, shared: true });
    });
    expect(alertToast).toHaveBeenCalledWith('삭제 완료', 'success');
  });

  it('category 삭제 실패 시 실패 toast가 식별된다.', async () => {
    (alertToast as jest.Mock).mockReturnValueOnce(jest.fn());
    implementServer([restHandler(mockedDeleteCategoryApi, { status: 400, message: 'bad request' })]);
    const { result } = renderHook(() => useCategoryDelete(), { wrapper: createQueryClientWrapper() });
    await waitFor(() => {
      result.current.deleteCategory({ id: MOCK_CATEGORY_ID, shared: true });
    });
    expect(alertToast).toHaveBeenCalledWith('bad request', 'warning');
  });
});
