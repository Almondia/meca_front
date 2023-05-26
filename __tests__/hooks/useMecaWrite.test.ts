import useMecaWrite from '@/hooks/meca/useMecaWrite';
import { renderHook, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { createQueryClientWrapper } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { server } from '../__mocks__/msw/server';
import { rest } from 'msw';
import { ENDPOINT } from '../__mocks__/msw/handlers';
import utilApi from '@/apis/utilApi';
import queryKey from '@/query/queryKey';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../apis/utilApi', () => ({
  revalidate: jest.fn(),
}));

describe('useMecaWrite', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      back: jest.fn(),
    });
    (utilApi.revalidate as jest.Mock).mockReturnValueOnce(true);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMeca revalidation', () => {
    it('Meca 등록 후 해당 카테고리에 카드가 1개라면 revalidate가 동작한다', async () => {
      (utilApi.revalidate as jest.Mock).mockReturnValueOnce(true);
      server.use(
        rest.get(`${ENDPOINT}/cards/categories/:id/me/count`, async (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              count: 1,
            }),
          );
        }),
      );
      const queryClient = new QueryClient();
      const { result } = renderHook(() => useMecaWrite(), { wrapper: createQueryClientWrapper(queryClient) });
      const { createMeca } = result.current;
      createMeca({
        title: 'title',
        question: 'question',
        answer: 'answer',
        cardType: 'OX_QUIZ',
        categoryId: 'cid01',
        description: 'desc',
      });
      await waitFor(() => expect(utilApi.revalidate).toHaveBeenCalledWith(['/']));
    });

    it('Meca 등록 전 해당 카테고리에 카드가 0개라면 revalidate가 동작한다', async () => {
      const queryClient = new QueryClient();
      queryClient.setQueryData<{ count: number }>([queryKey.mecas, 'cid01', 'count'], { count: 0 });
      const { result } = renderHook(() => useMecaWrite(), { wrapper: createQueryClientWrapper(queryClient) });
      const { createMeca } = result.current;
      createMeca({
        title: 'title',
        question: 'question',
        answer: 'answer',
        cardType: 'OX_QUIZ',
        categoryId: 'cid01',
        description: 'desc',
      });
      await waitFor(() => expect(utilApi.revalidate).toHaveBeenCalledWith(['/']));
    });

    it('Meca 등록 전 해당 카테고리에 카드가 1개 이상이면 revalidate가 동작하지 않는다.', async () => {
      const queryClient = new QueryClient();
      queryClient.setQueryData<{ count: number }>([queryKey.mecas, 'cid01', 'count'], { count: 99 });
      const { result } = renderHook(() => useMecaWrite(), { wrapper: createQueryClientWrapper(queryClient) });
      const { createMeca } = result.current;
      createMeca({
        title: 'title',
        question: 'question',
        answer: 'answer',
        cardType: 'OX_QUIZ',
        categoryId: 'cid01',
        description: 'desc',
      });
      await waitFor(() => expect(utilApi.revalidate).not.toHaveBeenCalled());
    });
  });

  describe('updateMeca revalidation', () => {
    it('Meca 업데이트에 성공하면 해당 cardId에 대해 revalidate 된다.', async () => {
      server.use(
        rest.put(`${ENDPOINT}/cards/:id`, async (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              cardId: 'card01',
              categoryId: 'category01',
              memberId: 'member01',
            }),
          );
        }),
      );
      const { result } = renderHook(() => useMecaWrite(), { wrapper: createQueryClientWrapper() });
      const { updateMeca } = result.current;
      updateMeca({
        cardId: 'card01',
        categoryId: 'category01',
        description: 'desc',
        question: 'question',
        title: 'title',
      });
      await waitFor(() => expect(utilApi.revalidate).toHaveBeenCalledWith(['/mecas/member01-card01']));
    });
  });
});
