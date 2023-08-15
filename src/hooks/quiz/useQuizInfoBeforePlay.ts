import { useCallback } from 'react';

import { QueryClient, useQuery } from '@tanstack/react-query';

import { QuizSimulationStateResponse } from '@/types/domain/quiz';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';
import alertToast from '@/utils/toastHandler';

const useQuizInfoBeforePlay = (categoryId: string) => {
  const fallback: QuizSimulationStateResponse[] = [];
  const { data: simulationBaseScoreList = fallback, isLoading } = useQuery(
    [queryKey.quiz, 'before', categoryId],
    () => mecaApi.getQuizCardsSimulationStateByCategoryId(categoryId),
    {
      onError: () => {
        alertToast('퀴즈 정보를 불러올 수 없습니다!', 'warning');
      },
    },
  );

  const getQuizCountByFilteredScore = useCallback(
    (maxScore: number) => {
      const countByFilteredScore = simulationBaseScoreList.reduce(
        (prev, { score, count }) => prev + (score <= maxScore ? count : 0),
        0,
      );
      return countByFilteredScore > 30 ? 30 : countByFilteredScore;
    },
    [simulationBaseScoreList],
  );

  return {
    simulationBaseScoreList,
    isLoading,
    isEmpty: simulationBaseScoreList.length === 0,
    getQuizCountByFilteredScore,
  };
};
useQuizInfoBeforePlay.fetchOrGetQuery = async (categoryId: string, queryClient: QueryClient) => {
  const prevSimulationBaseScoreList = queryClient.getQueryData<QuizSimulationStateResponse[]>([
    queryKey.quiz,
    'before',
    categoryId,
  ]);
  return (
    prevSimulationBaseScoreList ||
    queryClient.fetchQuery<QuizSimulationStateResponse[]>([queryKey.quiz, 'before', categoryId], () =>
      mecaApi.getQuizCardsSimulationStateByCategoryId(categoryId).catch(() => [] as QuizSimulationStateResponse[]),
    )
  );
};

export default useQuizInfoBeforePlay;
