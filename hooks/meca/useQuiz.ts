import { useQuery } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';
import { QuizAlgorithmType, QuizType } from '@/types/domain';

const useQuiz = (categoryId: string, limit: number, algorithm: QuizAlgorithmType) => {
  const fallback: QuizType[] = [];
  const {
    data: quizList = fallback,
    isLoading,
    refetch: fetchQuizData,
    isError,
  } = useQuery([queryKey.quiz], () => mecaApi.getQuizCards({ categoryId, limit, algorithm }), {
    enabled: false,
    staleTime: 3000000,
  });

  return { quizList, isLoading, isError, fetchQuizData };
};

export default useQuiz;
