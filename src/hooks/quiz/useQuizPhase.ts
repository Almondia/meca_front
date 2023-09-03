/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { quizPhaseState, quizTimeState } from '@/atoms/quiz';
import useCount from '@/hooks/useCount';

const useQuizPhase = (
  maxQuizNum: number,
  applyQuizResult: ({ round, spendTime, answer }: { round: number; spendTime: number; answer: string }) => void,
) => {
  const maxQuizTime = useRecoilValue(quizTimeState);
  const [quizPhase, setQuizPhase] = useRecoilState(quizPhaseState);
  const { number: round, increaseNumber: setNextRound, resetNumber: resetRound } = useCount(1, 1, maxQuizNum);
  const quizSpendTimeRef = useRef<number>(0);

  const progressNextQuiz = useCallback(() => {
    setNextRound(true);
    setQuizPhase('progress');
  }, []);

  const solveQuiz = useCallback(
    (answer: string) => {
      applyQuizResult({ round, spendTime: quizSpendTimeRef.current, answer });
      setQuizPhase(round === maxQuizNum ? 'end' : 'done');
    },
    [round, maxQuizNum, applyQuizResult],
  );

  const retryQuiz = useCallback(() => {
    setQuizPhase('progress');
    resetRound();
  }, []);

  const endQuiz = useCallback(() => {
    setQuizPhase('result');
  }, []);

  useEffect(() => {
    if (quizPhase !== 'progress') {
      quizSpendTimeRef.current = 0;
      return () => {};
    }
    const timeoutId = setTimeout(() => {
      solveQuiz('');
    }, maxQuizTime * 1000);
    const intervalId = setInterval(() => {
      quizSpendTimeRef.current += 1;
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [quizPhase]);

  return { round, maxQuizTime, quizPhase, progressNextQuiz, solveQuiz, endQuiz, retryQuiz };
};

export default useQuizPhase;
