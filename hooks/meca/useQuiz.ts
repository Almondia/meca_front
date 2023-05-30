import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import mecaApi, { MecaQuizRequest } from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';
import { QuizType } from '@/types/domain';

const useQuiz = (successHandler?: () => void) => {
  const fallback: QuizType[] = [];
  const [quizInfo, setQuizInfo] = useState<MecaQuizRequest | undefined>(undefined);
  const {
    data: quizList = fallback,
    isLoading,
    isError,
  } = useQuery(
    [queryKey.quiz],
    async () => {
      if (!quizInfo) {
        return [];
      }
      const response = await mecaApi.getQuizCards(quizInfo);
      return response;
    },
    {
      enabled: !!quizInfo,
      staleTime: 3000000,
      onSuccess: () => {
        successHandler?.();
      },
    },
  );

  const initQuiz = async (props: MecaQuizRequest) => {
    setQuizInfo(props);
  };

  return { quizList, isLoading, isError, initQuiz };
};

export default useQuiz;
