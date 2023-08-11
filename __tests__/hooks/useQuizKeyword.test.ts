import useQuizKeyword from '@/hooks/quiz/useQuizKeyword';
import { renderHook, waitFor } from '@testing-library/react';
import { createQueryClientWrapper } from '../utils';
import { QueryClient } from '@tanstack/react-query';
import queryKey from '@/query/queryKey';
import { Quiz } from '@/types/domain/quiz';
import { implementServer } from '@/mock/server';
import { restHandler } from '@/mock/handlers';
import { mockedPostKeywords } from '@/mock/api';
import statisticsApi from '@/apis/statisticsApi';

describe('useQuizKeyword', () => {
  const MOCKED_QUIZLIST: Quiz[] = [
    {
      cardId: 'cid',
      memberId: 'mid',
      title: 'title',
      question: 'question',
      answer: 'answer',
      cardType: 'KEYWORD',
      categoryId: 'categid',
      createdAt: 'createdAt',
      description: '',
    },
  ];
  const MOCKED_KEYWORDS = { hello: 25, world: 10 };

  it('초기에 quizPhaseKeywords는 fallback 값을 가진다.', () => {
    const { result } = renderHook(() => useQuizKeyword(), { wrapper: createQueryClientWrapper() });
    const { keywords } = result.current.quizPhaseKeywords;
    expect(keywords).toEqual({});
  });

  it('fetchQuizPhaseKeyword 호출 시 keyword가 리턴된다.', async () => {
    implementServer([restHandler(() => mockedPostKeywords(MOCKED_KEYWORDS))]);
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], MOCKED_QUIZLIST);
    const { result } = renderHook(() => useQuizKeyword(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => result.current.fetchQuizPhaseKeywords());
    const { keywords } = result.current.quizPhaseKeywords;
    expect(keywords).toEqual(MOCKED_KEYWORDS);
  });

  it('quiz keyword api 호출 실패 시 fallback 키워드가 리턴된다.', async () => {
    const spyPostKeywordsApi = jest.spyOn(statisticsApi, 'postKeywordBySentence');
    implementServer([restHandler(() => mockedPostKeywords(MOCKED_KEYWORDS), { status: 400 })]);
    const queryClient = new QueryClient();
    queryClient.setQueryData([queryKey.quiz], MOCKED_QUIZLIST);
    const { result } = renderHook(() => useQuizKeyword(), { wrapper: createQueryClientWrapper(queryClient) });
    await waitFor(() => result.current.fetchQuizPhaseKeywords(), { timeout: 3000 });
    const { keywords } = result.current.quizPhaseKeywords;
    expect(keywords).toEqual({});
    expect(spyPostKeywordsApi).toHaveBeenCalledTimes(2);
  });
});
