import { useQuery, useQueryClient } from '@tanstack/react-query';

import statisticsApi, { KeywordResponse } from '@/apis/statisticsApi';
import queryKey from '@/query/queryKey';
import { QuizType } from '@/types/domain';

const useQuizKeyword = () => {
  const queryClient = useQueryClient();
  const fallbackKeywordResult: KeywordResponse = { keywords: {} };
  const {
    data: quizPhaseKeywords = fallbackKeywordResult,
    isLoading: isQuizPhaseKeywordsLoading,
    refetch: fetchQuizPhaseKeywords,
  } = useQuery(
    [queryKey.keyword, 'quiz'],
    async () => {
      const quizList = queryClient.getQueryData<QuizType[]>([queryKey.quiz]);
      if (!quizList) {
        return fallbackKeywordResult;
      }
      const sentence = quizList.reduce((prev, cur) => `${prev} ${cur.title} ${cur.question} ${cur.answer}`, '');
      const response = await statisticsApi.postKeywordBySentence(sentence);
      return response;
    },
    {
      enabled: false,
      staleTime: 3,
      cacheTime: 3,
      retry: 1,
      onError: undefined,
    },
  );

  return { quizPhaseKeywords, fetchQuizPhaseKeywords, isQuizPhaseKeywordsLoading };
};

export default useQuizKeyword;
