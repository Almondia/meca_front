import utilApi from '@/apis/utilApi';
import useMecaDelete from '@/hooks/meca/useMecaDelete';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import mockRouter from 'next-router-mock';
import { createQueryClientWrapper } from '../utils';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import { server } from '../__mocks__/msw/server';
import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import useUser from '@/hooks/user/useUser';

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
    server.use(
      rest.delete(`${ENDPOINT}/cards/:id`, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ cardId, categoryId }));
      }),
    );
    (utilApi.revalidate as jest.Mock).mockReturnValueOnce(true);
    (useUser as jest.Mock).mockReturnValue({ user: { memberId: 'member01' } });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Meca 삭제 후 해당 카테고리에 카드가 0개라면 revalidate가 동작한다', async () => {
    server.use(
      rest.get(`${ENDPOINT}/cards/categories/:id/me/count`, async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            count: 0,
          }),
        );
      }),
    );
    const { result } = renderHook(() => useMecaDelete(), { wrapper: createQueryClientWrapper() });
    const { deleteMeca } = result.current;
    deleteMeca({ cardId, categoryId });
    await waitFor(() => expect(utilApi.revalidate).toHaveBeenCalledWith(['/', '/mecas/member01-cardId01']));
  });

  it('Meca 삭제 후 해당 카테고리에 카드가 0개가 아니라면 revalidate가 동작하지 않는다', async () => {
    server.use(
      rest.get(`${ENDPOINT}/cards/categories/:id/me/count`, async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            count: 55,
          }),
        );
      }),
    );
    const { result } = renderHook(() => useMecaDelete(), { wrapper: createQueryClientWrapper() });
    const { deleteMeca } = result.current;
    deleteMeca({ cardId, categoryId });
    await waitFor(() => expect(utilApi.revalidate).not.toHaveBeenCalled());
  });

  it('Meca 삭제 전 해당 카테고리에 카드가 1개라면 revalidate가 동작한다.', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData<{ count: number }>([queryKey.mecas, categoryId, 'count'], { count: 1 });
    const { result } = renderHook(() => useMecaDelete(), { wrapper: createQueryClientWrapper(queryClient) });
    const { deleteMeca } = result.current;
    deleteMeca({ cardId, categoryId });
    await waitFor(() => expect(utilApi.revalidate).toHaveBeenCalledWith(['/', '/mecas/member01-cardId01']));
  });

  it('Meca 삭제 전 mecas 페이지였다면 categories 페이지로 push된다.', async () => {
    mockRouter.push('/mecas/mid-cid');
    const { result } = renderHook(() => useMecaDelete(), { wrapper: createQueryClientWrapper() });
    const { deleteMeca } = result.current;
    deleteMeca({ cardId, categoryId });
    await waitFor(() => expect(mockRouter.asPath).toEqual('/categories'));
  });
});
