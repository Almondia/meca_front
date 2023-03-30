import { useQuery } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';
import { QuizAlgorithmType } from '@/types/domain';

const useQuiz = (categoryId: string, limit: number, algorithm: QuizAlgorithmType) => {
  const {
    data: quizList,
    isLoading,
    refetch: fetchQuizData,
    isError,
  } = useQuery([queryKey.quiz], () => mecaApi.getQuizCards({ categoryId, limit, algorithm }), { enabled: false });

  return { quizList, isLoading, isError, fetchQuizData };
};

export default useQuiz;
