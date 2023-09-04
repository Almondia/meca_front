import { useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import type { Quiz, QuizListRequest } from '@/types/domain/quiz';

import mecaApi from '@/apis/mecaApi';
import { quizPhaseState, quizTimeState, quizTitleState } from '@/atoms/quiz';
import queryKey from '@/query/queryKey';

const useQuiz = (successHandler?: () => void, errorHandler?: () => void) => {
  const queryClient = useQueryClient();
  const fallback: Quiz[] = [];
  const [quizInfo, setQuizInfo] = useState<QuizListRequest | undefined>(undefined);
  const setQuizTime = useSetRecoilState(quizTimeState);
  const setQuizTitle = useSetRecoilState(quizTitleState);
  const setQuizPhase = useSetRecoilState(quizPhaseState);

  const {
    data: quizList = fallback,
    isLoading,
    isError,
  } = useQuery(
    [queryKey.quiz],
    async () => {
      const response = await mecaApi.getQuizCards(quizInfo as QuizListRequest);
      return response.sort(() => Math.random() - 0.5);
    },
    {
      enabled: !!quizInfo,
      staleTime: 1200000,
      onSuccess: () => {
        successHandler?.();
      },
      onError: () => {
        errorHandler?.();
        setQuizInfo(undefined);
      },
    },
  );

  const initQuiz = ({
    categoryId,
    limit,
    score,
    title,
    quizTime,
  }: QuizListRequest & { title: string; quizTime: number }) => {
    queryClient.invalidateQueries([queryKey.quiz]);
    setQuizTitle(title);
    setQuizTime(quizTime);
    setQuizPhase('progress');
    setQuizInfo({ categoryId, limit, score });
  };

  return { quizList, isLoading, isError, initQuiz };
};

export default useQuiz;
