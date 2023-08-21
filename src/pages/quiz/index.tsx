/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';

import { useCallback, useEffect, useRef } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { QuizPhase, QuizSucceedType } from '@/types/domain/quiz';

import { quizPhaseState, quizTimeState } from '@/atoms/quiz';
import LoadSpinner from '@/components/@common/atoms/LoadSpinner';
import PostSection from '@/components/@common/molecules/PostSection';
import QuizPlayFallback from '@/components/quiz/molecules/QuizPlayFallback';
import QuizPlayHeader from '@/components/quiz/organisms/QuizPlayHeader';
import QuizPlayResultDashBoard from '@/components/quiz/organisms/QuizPlayResultDashboard';
import useQuizResult from '@/hooks/quiz/useQuizResult';
import useCount from '@/hooks/useCount';
import useScrollIntoView from '@/hooks/useScrollIntoView';
import { Devide, PostPageLayout } from '@/styles/layout';

const TimerBar = dynamic(() => import('@/components/@common/molecules/TimerBar'), { ssr: false });
const QuizRetryButtonGroup = dynamic(() => import('@/components/quiz/molecules/QuizRetryButtonGroup'), { ssr: false });
const QuizPlayResultTimeline = dynamic(() => import('@/components/quiz/organisms/QuizPlayResultTimeline'), {
  ssr: false,
});
const QuizPost = dynamic(() => import('@/components/quiz/organisms/QuizPost'), {
  ssr: false,
  loading: () => <LoadSpinner width="100%" height="600px" />,
});

type QuizPhaseSucceedHandlerType = Omit<Record<QuizPhase, QuizSucceedType>, 'result'>;

const QuizPage = () => {
  const quizPhaseTime = useRecoilValue(quizTimeState);
  const { quizList, solveQuiz, currentQuizResult, retryQuiz } = useQuizResult();
  const { number: round, increaseNumber: setNextRound, resetNumber: resetRound } = useCount(1, 1, quizList.length);
  const [quizPhase, setQuizPhase] = useRecoilState(quizPhaseState);
  const quizSpendTimeRef = useRef<number>(0);
  const [pageTopRef, scrollToTop] = useScrollIntoView<HTMLDivElement>();
  const quizIndex = round - 1;

  const nextQuizHandler = () => {
    setNextRound(true);
    setQuizPhase('progress');
  };

  const solveQuizHandler = useCallback(
    (answer?: string) => {
      if (!quizList[quizIndex]) {
        return;
      }
      setQuizPhase(round === quizList.length ? 'end' : 'done');
      solveQuiz({ cardId: quizList[quizIndex].cardId, spendTime: quizSpendTimeRef.current, answer: answer ?? '' });
    },
    [round, quizIndex],
  );

  const showQuizResultHandler = () => {
    setQuizPhase('result');
  };

  useEffect(() => {
    if (quizPhase === 'progress') {
      scrollToTop({ block: 'start', behavior: 'smooth' });
    }
    if (quizPhase === 'result') {
      scrollToTop({ block: 'start', behavior: 'auto' });
    }
    if (quizPhase !== 'progress') {
      quizSpendTimeRef.current = 0;
      return;
    }
    const timeoutId = setTimeout(() => {
      solveQuizHandler('');
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

  const quizPhaseSucceed: QuizPhaseSucceedHandlerType = {
    progress: {
      succeedText: '정답제출',
      succeedHandler: (answer?: string) => {
        solveQuizHandler(answer);
      },
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
    return <QuizPlayFallback />;
  }
  return (
    <PostPageLayout ref={pageTopRef}>
      <QuizPlayHeader
        quizCardTitle={quizList[quizIndex]?.title}
        quizCount={round}
        maxQuizCount={quizList.length}
        quizPhase={quizPhase}
      />
      {quizPhase === 'result' ? (
        <>
          <QuizPlayResultDashBoard maxQuizTime={quizPhaseTime} />
          <Devide />
          <PostSection>
            <PostSection.Title>Play Timeline</PostSection.Title>
            <PostSection.Body boxed={false} indented={false}>
              <QuizPlayResultTimeline quizList={quizList} />
            </PostSection.Body>
          </PostSection>
          <QuizRetryButtonGroup
            onRetry={(optionScore: number) => {
              retryQuiz(optionScore, () => {
                setQuizPhase('progress');
                resetRound();
              });
            }}
          />
        </>
      ) : (
        <>
          <TimerBar second={quizPhase === 'progress' ? quizPhaseTime : undefined} />
          <Devide />
          <QuizPost
            score={currentQuizResult?.score}
            inputAnswer={currentQuizResult?.inputAnswer}
            isAnswerState={quizPhase !== 'progress'}
            question={quizList[quizIndex].question}
            answer={quizList[quizIndex].answer}
            description={quizList[quizIndex].description}
            handleSucceed={quizPhaseSucceed[quizPhase]}
            quizType={quizList[quizIndex].cardType}
          />
        </>
      )}
    </PostPageLayout>
  );
};

export default QuizPage;
