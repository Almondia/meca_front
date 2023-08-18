/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { QuizPhase, QuizSucceedType } from '@/types/domain/quiz';

import { quizTimeState, quizTitleState } from '@/atoms/quiz';
import CountIndicator from '@/components/@common/atoms/CountIndicator';
import LinkButton from '@/components/@common/atoms/LinkButton';
import LoadSpinner from '@/components/@common/atoms/LoadSpinner';
import PageTitle from '@/components/@common/atoms/PageTitle';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import PostSection from '@/components/@common/molecules/PostSection';
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
  const router = useRouter();
  const quizTitle = useRecoilValue(quizTitleState);
  const quizPhaseTime = useRecoilValue(quizTimeState);
  const { quizList, solveQuiz, clearQuizPhase, currentQuizResult, retryQuiz } = useQuizResult();
  const { number: round, increaseNumber: setNextRound, resetNumber: resetRound } = useCount(1, 1, quizList.length);
  const [quizPhase, setQuizPhase] = useState<QuizPhase>('progress');
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

  useEffect(
    () => () => {
      clearQuizPhase();
    },
    [],
  );

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
    return (
      <PostPageLayout>
        {/* TODO: UI 추가할 것 */}
        <p>퀴즈 정보가 만료되었거나 풀이할 퀴즈가 없어요!</p>
        <Link href="/">홈으로</Link>
      </PostPageLayout>
    );
  }
  return (
    <PostPageLayout ref={pageTopRef}>
      <BetweenSection>
        <BetweenSection.Left>
          <PageTitle>{quizPhase === 'result' ? quizTitle : quizList[quizIndex].title}</PageTitle>
        </BetweenSection.Left>
        <BetweenSection.Right>
          {quizPhase === 'result' ? (
            <LinkButton onClick={() => router.back()} textSize="main">
              목록으로
            </LinkButton>
          ) : (
            <CountIndicator currentCount={round} maxCount={quizList.length} />
          )}
        </BetweenSection.Right>
      </BetweenSection>
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
            title={quizTitle}
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
          <br />
          <br />
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
