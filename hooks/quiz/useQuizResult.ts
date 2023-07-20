import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import mecaApi from '@/apis/mecaApi';
import { quizTimeState, quizTitleState } from '@/atoms/quiz';
import { MECATAG_VALUES } from '@/components/molcules/MecaTag/type';
import queryKey from '@/query/queryKey';
import { MECA_RESPONE_TO_TAG, MecaTagType, QuizType } from '@/types/domain';
import alertToast from '@/utils/toastHandler';

import useQuiz from './useQuiz';

const useQuizResult = () => {
  const queryClient = useQueryClient();
  const fallback: QuizType[] = [];
  const { quizList = fallback } = useQuiz();
  const setQuizTime = useSetRecoilState(quizTimeState);
  const setQuizTitle = useSetRecoilState(quizTitleState);

  const applyScore = useCallback(async (userAnswer: string, cardId: string) => {
    try {
      const { score } = await mecaApi.applyQuizResult({ cardId, userAnswer });
      return score;
    } catch {
      alertToast('점수를 계산하지 못했습니다.', 'warning');
      return 0;
    }
  }, []);

  const { mutate: solveQuiz, data: currentQuizList } = useMutation<
    { solvedQuizList: QuizType[]; currentQuizResult?: { score: number; inputAnswer: string } },
    never,
    { cardId: string; spendTime: number; answer: string }
  >(
    async ({ cardId, spendTime, answer }) => {
      if (!quizList) {
        return quizList;
      }
      const currentScore = await applyScore(answer, cardId);
      const solvedQuizList: QuizType[] = quizList.map((quiz) =>
        quiz.cardId === cardId
          ? {
              ...quiz,
              result: {
                cardId,
                userAnswer: answer,
                score: currentScore,
                spendTime,
              },
            }
          : quiz,
      );
      return { solvedQuizList, currentQuizResult: { score: currentScore, inputAnswer: answer } };
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData([queryKey.quiz], data.solvedQuizList);
      },
    },
  );

  const getQuizTypeRateResult = () => {
    const keys = Object.keys(MECATAG_VALUES) as MecaTagType[];
    const names = keys.reduce((prev, next, idx) => ({ ...prev, [next]: idx }), {}) as Record<MecaTagType, number>;
    const answerRate = [...Array(keys.length)].fill(0);
    const count = [...Array(keys.length)].fill(0);
    quizList.forEach((quiz) => {
      const tag = MECA_RESPONE_TO_TAG[quiz.cardType];
      answerRate[names[tag]] += (quiz.result?.score ?? 0) * 0.01;
      count[names[tag]] += 1;
    });
    return {
      names: (Object.getOwnPropertyNames(names) as MecaTagType[]).map((name) => MECATAG_VALUES[name].text),
      answerRate,
      count,
    };
  };

  const getAnswerRateResult = () => {
    const [totalScore, totalSecond] = ([...quizList] as Required<QuizType>[]).reduce(
      (prev, next) => [prev[0] + next.result.score, prev[1] + next.result.spendTime],
      [0, 0],
    );
    return { avgScore: totalScore / (quizList.length * 100), avgTime: totalSecond / quizList.length };
  };

  const clearQuizPhase = () => {
    setQuizTime(0);
    setQuizTitle('');
    queryClient.removeQueries([queryKey.quiz]);
  };

  return {
    quizList,
    solveQuiz,
    getQuizTypeRateResult,
    getAnswerRateResult,
    clearQuizPhase,
    currentQuizResult: currentQuizList?.currentQuizResult,
  };
};

export default useQuizResult;
