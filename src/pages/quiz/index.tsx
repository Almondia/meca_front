/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { quizTimeState, quizTitleState } from '@/atoms/quiz';
import CountIndicator from '@/components/@common/atoms/CountIndicator';
import LinkButton from '@/components/@common/atoms/LinkButton';
import LoadSpinner from '@/components/@common/atoms/LoadSpinner';
import PageTitle from '@/components/@common/atoms/PageTitle';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import useQuizResult from '@/hooks/quiz/useQuizResult';
import useCount from '@/hooks/useCount';
import { PostPageLayout } from '@/styles/layout';
import { QuizPhaseType, QuizSucceedType } from '@/types/domain';

const TimerBar = dynamic(() => import('@/components/@common/molecules/TimerBar'), { ssr: false });
const QuizRetryController = dynamic(() => import('@/components/quiz/organisms/QuizRetryController'), { ssr: false });
const QuizPost = dynamic(() => import('@/components/quiz/organisms/QuizPost'), {
  ssr: false,
  loading: () => <LoadSpinner width="100%" />,
});
const QuizResult = dynamic(() => import('@/components/quiz/organisms/QuizResult'), {
  ssr: false,
  loading: () => <LoadSpinner width="100%" />,
});

type QuizPhaseSucceedHandlerType = Omit<Record<QuizPhaseType, QuizSucceedType>, 'result'>;

const QuizPage = () => {
  const router = useRouter();
  const quizTitle = useRecoilValue(quizTitleState);
  const quizPhaseTime = useRecoilValue(quizTimeState);
  const { quizList, solveQuiz, clearQuizPhase, currentQuizResult, retryQuiz } = useQuizResult();
  const { number: round, increaseNumber: setNextRound, resetNumber: resetRound } = useCount(1, 1, quizList.length);
  const [quizPhase, setQuizPhase] = useState<QuizPhaseType>('progress');
  const quizSpendTimeRef = useRef<number>(0);
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
    <PostPageLayout>
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
          <QuizResult quizList={quizList} maxQuizTime={quizPhaseTime} />
          <QuizRetryController
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
