import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import type { MecaTag } from '@/types/domain/meca';
import type { Quiz } from '@/types/domain/quiz';

import cardHistoryApi from '@/apis/cardHistoryApi';
import { quizPhaseState, quizTimeState, quizTitleState } from '@/atoms/quiz';
import queryKey from '@/query/queryKey';
import { MECA_TAGS } from '@/utils/constants';
import alertToast from '@/utils/toastHandler';

import useQuiz from './useQuiz';

const useQuizResult = () => {
  const queryClient = useQueryClient();
  const fallback: Quiz[] = [];
  const { quizList = fallback } = useQuiz();
  const setQuizTime = useSetRecoilState(quizTimeState);
  const setQuizTitle = useSetRecoilState(quizTitleState);
  const setQuizPhase = useSetRecoilState(quizPhaseState);

  const applyScore = useCallback(async (userAnswer: string, cardId: string) => {
    try {
      const { score } = await cardHistoryApi.applyQuizHistory({ cardId, userAnswer });
      return score;
    } catch {
      alertToast('점수를 계산하지 못했습니다.', 'warning');
      return 0;
    }
  }, []);

  const { mutate: solveQuiz, data: currentQuizList } = useMutation<
    { solvedQuizList: Quiz[]; currentQuizResult?: { score: number; inputAnswer: string } },
    never,
    { cardId: string; spendTime: number; answer: string }
  >(
    async ({ cardId, spendTime, answer }) => {
      if (!quizList) {
        return quizList;
      }
      const currentScore = await applyScore(answer, cardId);
      const solvedQuizList: Quiz[] = quizList.map((quiz) =>
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
    const keys = Object.keys(MECA_TAGS) as MecaTag[];
    const names = keys.reduce((prev, next, idx) => ({ ...prev, [next]: idx }), {}) as Record<MecaTag, number>;
    const answerRate = [...Array(keys.length)].fill(0);
    const count = [...Array(keys.length)].fill(0);
    quizList.forEach((quiz) => {
      const tag = quiz.cardType;
      answerRate[names[tag]] += (quiz.result?.score ?? 0) * 0.01;
      count[names[tag]] += 1;
    });
    return {
      names: (Object.getOwnPropertyNames(names) as MecaTag[]).map((name) => MECA_TAGS[name].text),
      answerRate,
      count,
    };
  };

  const getAnswerRateResult = () => {
    const [totalScore, totalSecond] = ([...quizList] as Required<Quiz>[]).reduce(
      (prev, next) => [prev[0] + next.result.score, prev[1] + next.result.spendTime],
      [0, 0],
    );
    return { avgScore: totalScore / (quizList.length * 100), avgTime: totalSecond / quizList.length };
  };
  const clearQuizPhase = useCallback(() => {
    setQuizTime(0);
    setQuizTitle('');
    setQuizPhase('progress');
    queryClient.removeQueries([queryKey.quiz]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retryQuiz = (optionScore: number, retryCallback: () => void) => {
    const scoreLimit = Math.max(0, Math.min(optionScore, 100));
    const filteredQuizList = quizList
      .filter((quiz) => (quiz?.result?.score ?? 0) <= scoreLimit)
      .map((filteredQuiz) => ({ ...filteredQuiz, result: undefined }));
    if (filteredQuizList.length === 0) {
      alertToast('다시 풀 문제가 없어요!', 'info');
      return;
    }
    retryCallback();
    queryClient.setQueryData([queryKey.quiz], filteredQuizList);
  };

  return {
    quizList,
    solveQuiz,
    getQuizTypeRateResult,
    getAnswerRateResult,
    clearQuizPhase,
    retryQuiz,
    currentQuizResult: currentQuizList?.currentQuizResult,
  };
};

export default useQuizResult;
