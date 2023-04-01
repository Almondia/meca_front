import { useMutation, useQueryClient } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';
import { QuizType } from '@/types/domain';

const useQuizResult = () => {
  const queryClient = useQueryClient();
  const fallback: QuizType[] = [];
  const quizList = queryClient.getQueryData<QuizType[]>([queryKey.quiz]) ?? fallback;

  const { mutate: applyQuizResult } = useMutation(mecaApi.applyQuizResult);

  const solveQuiz = (cardId: string, answer?: string) => {
    if (!quizList) {
      return;
    }
    queryClient.setQueryData(
      [queryKey.quiz],
      quizList.map((quiz) =>
        quiz.cardId === cardId
          ? {
              ...quiz,
              result: {
                cardId,
                userAnswer: answer ?? '시간초과!',
                score: answer === quiz.answer ? 100 : 0,
              },
            }
          : quiz,
      ),
    );
  };

  return { quizList, solveQuiz, applyQuizResult };
};

export default useQuizResult;
