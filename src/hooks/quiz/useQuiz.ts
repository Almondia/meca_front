import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import type { Quiz, QuizListRequest } from '@/types/domain/quiz';

import mecaApi from '@/apis/mecaApi';
import { quizTimeState, quizTitleState } from '@/atoms/quiz';
import queryKey from '@/query/queryKey';

const useQuiz = (successHandler?: () => void, errorHandler?: () => void) => {
  const fallback: Quiz[] = [];
  const [quizInfo, setQuizInfo] = useState<QuizListRequest | undefined>(undefined);
  const setQuizTime = useSetRecoilState(quizTimeState);
  const setQuizTitle = useSetRecoilState(quizTitleState);

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
      onError: () => {
        errorHandler?.();
      },
    },
  );

  const initQuiz = ({
    categoryId,
    limit,
    algorithm,
    title,
    quizTime,
  }: QuizListRequest & { title: string; quizTime: number }) => {
    setQuizTitle(title);
    setQuizTime(quizTime);
    setQuizInfo({ categoryId, limit, algorithm });
  };

  return { quizList, isLoading, isError, initQuiz };
};

export default useQuiz;
