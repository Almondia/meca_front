import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { ExtractedKeywordsResponse } from '@/types/domain';
import type { Quiz } from '@/types/domain/quiz';

import statisticsApi from '@/apis/statisticsApi';
import queryKey from '@/query/queryKey';
import { extractTextFromHTML } from '@/utils/htmlTextHandler';

const useQuizKeyword = () => {
  const queryClient = useQueryClient();
  const fallbackKeywordResult: ExtractedKeywordsResponse = { keywords: {} };
  const {
    data: quizPhaseKeywords = fallbackKeywordResult,
    isLoading: isQuizPhaseKeywordsLoading,
    refetch: fetchQuizPhaseKeywords,
  } = useQuery(
    [queryKey.quiz, queryKey.keyword],
    async () => {
      const quizList = queryClient.getQueryData<Quiz[]>([queryKey.quiz]);
      if (!quizList) {
        return fallbackKeywordResult;
      }
      const sentence = quizList.reduce(
        (prev, cur) => `${prev} ${cur.title} ${extractTextFromHTML(cur.question)} ${cur.answer}`,
        '',
      );
      const response = await statisticsApi.postKeywordBySentence(sentence);
      return response;
    },
    {
      refetchOnMount: false,
      enabled: false,
      retry: 1,
      onError: undefined,
    },
  );

  return { quizPhaseKeywords, fetchQuizPhaseKeywords, isQuizPhaseKeywordsLoading };
};

export default useQuizKeyword;
