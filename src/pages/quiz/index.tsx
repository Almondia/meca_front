import dynamic from 'next/dynamic';

import { useMemo } from 'react';

import type { QuizPhase, QuizSucceedType } from '@/types/domain/quiz';

import PostSection from '@/components/@common/molecules/PostSection';
import QuizPlayFallback from '@/components/quiz/molecules/QuizPlayFallback';
import QuizPlayHeader from '@/components/quiz/organisms/QuizPlayHeader';
import QuizPlayResultDashBoard from '@/components/quiz/organisms/QuizPlayResultDashboard';
import useQuizPhase from '@/hooks/quiz/useQuizPhase';
import useQuizPhaseScrollControl from '@/hooks/quiz/useQuizPhaseScrollControl';
import useQuizResult from '@/hooks/quiz/useQuizResult';
import { Devide, PostPageLayout } from '@/styles/layout';

const TimerBar = dynamic(() => import('@/components/@common/molecules/TimerBar'), { ssr: false });
const QuizRetryButtonGroup = dynamic(() => import('@/components/quiz/molecules/QuizRetryButtonGroup'), { ssr: false });
const QuizPost = dynamic(() => import('@/components/quiz/organisms/QuizPost'), { ssr: false });
const QuizPlayResultTimeline = dynamic(() => import('@/components/quiz/organisms/QuizPlayResultTimeline'), {
  ssr: false,
});

type QuizPhaseSucceedHandlerType = Omit<Record<QuizPhase, QuizSucceedType>, 'result'>;

const QuizPage = () => {
  const { quizList, applyQuizResult, currentQuizResult, refreshQuizResult } = useQuizResult();
  const { round, quizPhase, maxQuizTime, progressNextQuiz, solveQuiz, endQuiz, retryQuiz } = useQuizPhase(
    quizList.length,
    applyQuizResult,
  );
  const scrollToTopTargetRef = useQuizPhaseScrollControl();
  const quizIndex = round - 1;

  const quizPhaseSucceed: QuizPhaseSucceedHandlerType = useMemo(
    () => ({
      progress: {
        succeedText: '정답제출',
        succeedHandler: (answer = '') => {
          solveQuiz(answer);
        },
      },
      done: {
        succeedText: '다음문제',
        succeedHandler: progressNextQuiz,
      },
      end: {
        succeedText: '결과보기',
        succeedHandler: endQuiz,
      },
    }),
    [progressNextQuiz, endQuiz, solveQuiz],
  );

  if (quizList.length === 0) {
    return <QuizPlayFallback />;
  }
  return (
    <PostPageLayout ref={scrollToTopTargetRef}>
      <QuizPlayHeader
        quizCardTitle={quizList[quizIndex]?.title}
        quizCount={round}
        maxQuizCount={quizList.length}
        quizPhase={quizPhase}
      />
      {quizPhase === 'result' ? (
        <>
          <QuizPlayResultDashBoard maxQuizTime={maxQuizTime} />
          <Devide />
          <PostSection>
            <PostSection.Title>Play Timeline</PostSection.Title>
            <PostSection.Body boxed={false} indented={false}>
              <QuizPlayResultTimeline quizList={quizList} />
            </PostSection.Body>
          </PostSection>
          <QuizRetryButtonGroup
            onRetry={(optionScore: number) => {
              refreshQuizResult(optionScore, retryQuiz);
            }}
          />
        </>
      ) : (
        <>
          <TimerBar second={quizPhase === 'progress' ? maxQuizTime : undefined} />
          <Devide />
          <QuizPost
            score={currentQuizResult?.score}
            inputAnswer={currentQuizResult?.inputAnswer}
            isAnswerState={quizPhase !== 'progress'}
            handleSucceed={quizPhaseSucceed[quizPhase]}
            quizType={quizList[quizIndex].cardType}
            {...quizList[quizIndex]}
          />
        </>
      )}
    </PostPageLayout>
  );
};

export default QuizPage;
