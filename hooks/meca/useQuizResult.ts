import { useMutation, useQueryClient } from '@tanstack/react-query';

import mecaApi from '@/apis/mecaApi';
import queryKey from '@/query/queryKey';
import { QuizType } from '@/types/domain';

const useQuizResult = () => {
  const queryClient = useQueryClient();
  const fallback: QuizType[] = [];
  const quizList = queryClient.getQueryData<QuizType[]>([queryKey.quiz]) ?? fallback;

  const { mutate: applyQuizResult } = useMutation(mecaApi.applyQuizResult, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.categories, 'me']);
      // TODO: 결과 UI 구현 후 결과 페이지 이탈 시 동작하도록 수정하기
      queryClient.setQueryData([queryKey.quiz], []);
    },
  });

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
                userAnswer: answer || '시간초과 또는 정답 미제출',
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
