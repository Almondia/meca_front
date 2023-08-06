import utilApi from '@/apis/utilApi';
import useMecaDelete from '@/hooks/meca/useMecaDelete';
import { renderHook, waitFor } from '@testing-library/react';
import { createQueryClientWrapper } from '../utils';
import { restHandler } from '../__mocks__/msw/handlers';
import { implementServer } from '../__mocks__/msw/server';
import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import useUser from '@/hooks/user/useUser';
import { mockedDeleteMecaApi, mockedGetMecaCountApi } from '../__mocks__/msw/api';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('../../apis/utilApi', () => ({
  revalidate: jest.fn(),
}));

jest.mock('@/hooks/user/useUser', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useMecaDelete', () => {
  const cardId = 'cardId01';
  const categoryId = 'categoryId01';
  beforeEach(() => {
    implementServer([restHandler(mockedDeleteMecaApi)]);
    (utilApi.revalidate as jest.Mock).mockReturnValueOnce(true);
    (useUser as unknown as jest.Mock).mockReturnValue({ user: { memberId: 'member01' } });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Meca 삭제 후 해당 카테고리에 카드가 0개라면 [shared category, meca] revalidate가 동작한다', async () => {
    implementServer([restHandler(() => mockedGetMecaCountApi(0))]);
    const { result } = renderHook(() => useMecaDelete(), { wrapper: createQueryClientWrapper() });
    const { deleteMeca } = result.current;
    deleteMeca({ cardId, categoryId });
    await waitFor(() => expect(utilApi.revalidate).toHaveBeenCalledWith(['/mecas/member01-cardId01', '/']));
  });

  it('Meca 삭제 후 해당 카테고리에 카드가 0개가 아니라면 [meca] revalidate가 동작한다.', async () => {
    implementServer([restHandler(() => mockedGetMecaCountApi(55))]);
    const { result } = renderHook(() => useMecaDelete(), { wrapper: createQueryClientWrapper() });
    const { deleteMeca } = result.current;
    deleteMeca({ cardId, categoryId });
    await waitFor(() => expect(utilApi.revalidate).toHaveBeenCalledWith(['/mecas/member01-cardId01']));
  });

  it('Meca 삭제 전 해당 카테고리에 카드가 1개라면 [shared category, meca] revalidate가 동작한다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.mecas, categoryId, 'count'], { count: 1, cached: true });
    const { result } = renderHook(() => useMecaDelete(), { wrapper: createQueryClientWrapper(queryClient) });
    const { deleteMeca } = result.current;
    deleteMeca({ cardId, categoryId });
    await waitFor(() => expect(utilApi.revalidate).toHaveBeenCalledWith(['/mecas/member01-cardId01', '/']));
  });
});
