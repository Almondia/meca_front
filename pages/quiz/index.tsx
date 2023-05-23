/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { quizTimeState, quizTitleState } from '@/atoms/quiz';
import CountIndicator from '@/components/atoms/CountIndicator';
import LoadSpinner from '@/components/atoms/LoadSpinner';
import useQuizResult from '@/hooks/meca/useQuizResult';
import useCount from '@/hooks/useCount';
import { FlexSpaceBetween, PostSection } from '@/styles/layout';
import { QuizPhaseType, QuizResultType, QuizSucceedType } from '@/types/domain';

const QuizPost = dynamic(() => import('@/components/organisms/QuizPost'), {
  loading: () => <LoadSpinner width="100%" />,
  ssr: false,
});

const QuizResult = dynamic(() => import('@/components/organisms/QuizResult'), {
  loading: () => <LoadSpinner width="100%" />,
  ssr: false,
});

const TimerBar = dynamic(() => import('@/components/molcules/TimerBar'));
const PageTitle = dynamic(() => import('@/components/atoms/PageTitle'));

const QuizTitleBox = styled.div`
  ${FlexSpaceBetween};
  align-items: center;
`;

type QuizPhaseSucceedHandlerType = Omit<Record<QuizPhaseType, QuizSucceedType>, 'result'>;

const QuizPage = () => {
  const quizTitle = useRecoilValue(quizTitleState);
  const quizPhaseTime = useRecoilValue(quizTimeState);
  const { quizList, solveQuiz, applyQuizResult, clearQuizPhase } = useQuizResult();
  const { number: round, increaseNumber: setNextRound } = useCount(1, 1, quizList.length);
  const [quizPhase, setQuizPhase] = useState<QuizPhaseType>('progress');
  const quizSpendTimeRef = useRef<number>(0);
  const quizIndex = round - 1;

  const nextQuizHandler = () => {
    setNextRound(true);
    setQuizPhase('progress');
  };

  const solveQuizHandler = useCallback(
    async (answer?: string) => {
      if (!quizList[quizIndex]) {
        return;
      }
      setQuizPhase(round === quizList.length ? 'end' : 'done');
      await solveQuiz(quizList[quizIndex].cardId, quizSpendTimeRef.current, answer);
    },
    [round, quizIndex],
  );

  const showQuizResultHandler = () => {
    applyQuizResult(quizList.map((quiz) => quiz.result as QuizResultType));
    setQuizPhase('result');
  };

  useEffect(() => {
    if (quizPhase !== 'progress') {
      quizSpendTimeRef.current = 0;
      return;
    }
    const timeoutId = setTimeout(() => {
      solveQuizHandler('시간초과!');
    }, quizPhaseTime * 1000);
    const intervalId = setInterval(() => {
      quizSpendTimeRef.current += 1;
    }, 1000);
    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [quizPhase]);

  useEffect(
    () => () => {
      clearQuizPhase();
    },
    [],
  );

  const quizPhaseSucceed: QuizPhaseSucceedHandlerType = {
    progress: {
      succeedText: '정답제출',
      succeedHandler: solveQuizHandler,
    },
    done: {
      succeedText: '다음문제',
      succeedHandler: nextQuizHandler,
    },
    end: {
      succeedText: '결과보기',
      succeedHandler: showQuizResultHandler,
    },
  };

  if (quizList.length === 0) {
    return (
      <PostSection>
        {/* TODO: UI 추가할 것 */}
        <p>퀴즈 정보가 만료되었거나 풀이할 퀴즈가 없어요!</p>
        <Link href="/">홈으로</Link>
      </PostSection>
    );
  }
  if (quizPhase === 'result') {
    return (
      <PostSection>
        <QuizTitleBox>
          <PageTitle>{quizTitle}</PageTitle>
          <Link href="/categories">목록으로</Link>
        </QuizTitleBox>
        <QuizResult quizList={quizList} maxQuizTime={quizPhaseTime} />
      </PostSection>
    );
  }
  return (
    <PostSection>
      <QuizTitleBox>
        <PageTitle>{quizTitle}</PageTitle>
        <CountIndicator currentCount={round} maxCount={quizList.length} />
      </QuizTitleBox>
      {quizPhase === 'progress' ? <TimerBar second={quizPhaseTime ?? undefined} /> : <TimerBar />}
      <br />
      <br />
      <QuizPost
        isAnswerState={quizPhase !== 'progress'}
        question={quizList[quizIndex].question}
        answer={quizList[quizIndex].answer}
        description={quizList[quizIndex].description}
        handleSucceed={quizPhaseSucceed[quizPhase]}
        quizType={quizList[quizIndex].cardType}
      />
    </PostSection>
  );
};

export default QuizPage;
