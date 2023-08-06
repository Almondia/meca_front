import useMecaWrite from '@/hooks/meca/useMecaWrite';
import { renderHook, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { createQueryClientWrapper } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import { implementServer } from '../__mocks__/msw/server';
import { restHandler, restOverridedResponseHandler } from '../__mocks__/msw/handlers';
import utilApi from '@/apis/utilApi';
import queryKey from '@/query/queryKey';
import { mockedGetMecaCountApi, mockedPostMecaApi, mockedPutMecaUpdateApi } from '../__mocks__/msw/api';

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
      implementServer([restHandler(() => mockedGetMecaCountApi(1)), restHandler(mockedPostMecaApi)]);
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

    it('Meca 등록 전 해당 카테고리에 카드가 0개라면 revalidate가 동작한다', async () => {
      implementServer([restHandler(mockedPostMecaApi)]);
      const queryClient = new QueryClient();
      queryClient.setQueryData([queryKey.mecas, 'cid01', 'count'], { count: 0, cached: true });
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
