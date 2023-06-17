import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import mecaApi, { MecaQuizRequest } from '@/apis/mecaApi';
import { quizTimeState, quizTitleState } from '@/atoms/quiz';
import queryKey from '@/query/queryKey';
import { QuizType } from '@/types/domain';

const useQuiz = (successHandler?: () => void) => {
  const fallback: QuizType[] = [];
  const [quizInfo, setQuizInfo] = useState<MecaQuizRequest | undefined>(undefined);
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
    },
  );

  const initQuiz = ({
    categoryId,
    limit,
    algorithm,
    title,
    quizTime,
  }: MecaQuizRequest & { title: string; quizTime: number }) => {
    setQuizTitle(title);
    setQuizTime(quizTime);
    setQuizInfo({ categoryId, limit, algorithm });
  };

  return { quizList, isLoading, isError, initQuiz };
};

export default useQuiz;
