import useMecaWrite from '@/hooks/meca/useMecaWrite';
import { renderHook, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { createQueryClientWrapper } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { implementServer } from '@/mock/server';
import { restHandler, restOverridedResponseHandler } from '@/mock/handlers';
import utilApi from '@/apis/utilApi';
import queryKey from '@/query/queryKey';
import { mockedGetMecaCountApi, mockedPostMecaApi, mockedPutMecaUpdateApi } from '@/mock/api';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/apis/utilApi', () => ({
  revalidate: jest.fn(),
}));

describe('useMecaWrite', () => {
  beforeEach(() => {
    (utilApi.revalidate as jest.Mock).mockReturnValueOnce(true);
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMeca revalidation', () => {
    it('Meca 등록 후 해당 공유 카테고리에 카드가 1개면 revalidate가 동작한다', async () => {
      implementServer([restHandler(() => mockedGetMecaCountApi(1, true)), restHandler(mockedPostMecaApi)]);
      (utilApi.revalidate as jest.Mock).mockReturnValueOnce(true);
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

    it('공유되지 않은 카테고리에 대한 카드 등록 시 revalidate가 동작하지 않는다.', async () => {
      implementServer([restHandler(() => mockedGetMecaCountApi(1, false)), restHandler(mockedPostMecaApi)]);
      (utilApi.revalidate as jest.Mock).mockReturnValueOnce(true);
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
      await waitFor(() => expect(utilApi.revalidate).not.toHaveBeenCalled());
    });

    it('Meca 등록 전 해당 공유 카테고리에 카드가 0개라면 revalidate가 동작한다', async () => {
      implementServer([restHandler(mockedPostMecaApi)]);
      const queryClient = new QueryClient();
      queryClient.setQueryData([queryKey.mecas, 'cid01', 'count'], { count: 0, cached: true, shared: true });
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
      implementServer([restHandler(mockedPostMecaApi)]);
      const queryClient = new QueryClient();
      queryClient.setQueryData([queryKey.mecas, 'cid01', 'count'], { count: 5, cached: true });
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
      implementServer([
        restOverridedResponseHandler(mockedPutMecaUpdateApi, {
          cardId: 'card01',
          categoryId: 'category01',
          memberId: 'member01',
        }),
      ]);
      const { result } = renderHook(() => useMecaWrite(), { wrapper: createQueryClientWrapper() });
      const { updateMeca } = result.current;
      updateMeca({
        cardId: 'card01',
        categoryId: 'category01',
        description: 'desc',
        question: 'question',
        title: 'title',
        answer: 'answer',
      });
      await waitFor(() => expect(utilApi.revalidate).toHaveBeenCalledWith(['/mecas/member01-card01']));
    });
  });
});
