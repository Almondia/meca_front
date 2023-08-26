import useMecaDelete from '@/hooks/meca/useMecaDelete';
import { renderHook, waitFor } from '@testing-library/react';
import { createQueryClientWrapper } from '../utils';
import { restHandler } from '@/mock/handlers';
import { implementServer, resetServer } from '@/mock/server';
import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import useUser from '@/hooks/user/useUser';
import { mockedDeleteMecaApi } from '@/mock/api';

import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('@/hooks/user/useUser', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useMecaDelete', () => {
  const cardId = 'cardId01';
  const categoryId = 'categoryId01';
  beforeEach(() => {
    implementServer([restHandler(mockedDeleteMecaApi)]);
    (useUser as unknown as jest.Mock).mockReturnValue({ user: { memberId: 'member01' } });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Meca 삭제 후 해당 카테고리 페이지가 아니였다면 이동한다.', async () => {
    await mockRouter.push('/category/categoryId01/write-card');
    const { result } = renderHook(() => useMecaDelete(), { wrapper: createQueryClientWrapper() });
    const { deleteMeca } = result.current;
    await waitFor(() => deleteMeca({ cardId, categoryId }));
    expect(mockRouter.pathname).toEqual('/category/categoryId01/member01');
  });

  it('Meca 삭제 실패 시 route 이동이 없다.', async () => {
    mockRouter.push = jest.fn();
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.mecas, categoryId, 'count'], { count: 1, shared: true, cached: true });
    resetServer([restHandler(mockedDeleteMecaApi, { status: 500, message: 'server error' })]);
    const { result } = renderHook(() => useMecaDelete(), { wrapper: createQueryClientWrapper(queryClient) });
    const { deleteMeca } = result.current;
    await waitFor(() => deleteMeca({ cardId, categoryId }));
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
