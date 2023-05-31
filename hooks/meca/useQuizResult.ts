import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import mecaApi from '@/apis/mecaApi';
import statisticsApi from '@/apis/statisticsApi';
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

  const {
    mutate: applyQuizKeyword,
    data: quizKeywords,
    isLoading: isApplyKeywordLoading,
  } = useMutation(async () => {
    const sentence = quizList.reduce((prev, cur) => `${prev} ${cur.title} ${cur.question} ${cur.answer}`, '');
    const response = await statisticsApi.postKeywordBySentence(sentence);
    return response;
  });

  const { mutate: applyQuizResult } = useMutation(mecaApi.applyQuizResult, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey.categories, 'me']);
    },
  });

  const applyScore = useCallback(async (inputAnswer: string, quizAnswer: string) => {
    try {
      const response = await statisticsApi.postScoreByAnswerInput(inputAnswer, quizAnswer);
      return response.score;
    } catch {
      alertToast('점수를 계산하지 못했습니다.', 'warning');
      return 0;
    }
  }, []);

  const solveQuiz = async (cardId: string, spendTime: number, answer?: string) => {
    if (!quizList) {
      return;
    }
    const solvedQuizList = await Promise.all(
      quizList.map(async (quiz) =>
        quiz.cardId === cardId
          ? {
              ...quiz,
              result: {
                cardId,
                userAnswer: answer ?? '',
                score: answer ? await applyScore(answer, quiz.answer) : 0,
                spendTime,
              },
            }
          : quiz,
      ),
    );
    queryClient.setQueryData([queryKey.quiz], solvedQuizList);
  };

  const getQuizTypeRateResult = () => {
    // TODO: 주관식 문제 구현되면 filter 삭제
    const keys = (Object.keys(MECATAG_VALUES) as MecaTagType[]).filter((key) => key !== 'desc');
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
    queryClient.setQueryData([queryKey.quiz], []);
  };

  return {
    quizList,
    solveQuiz,
    applyQuizResult,
    applyQuizKeyword,
    quizKeywords,
    getQuizTypeRateResult,
    getAnswerRateResult,
    clearQuizPhase,
    isApplyKeywordLoading,
  };
};

export default useQuizResult;
