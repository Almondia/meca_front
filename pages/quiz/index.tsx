/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';

import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useCallback, useEffect, useState } from 'react';

import { QuizPhaseType, QuizResultType, QuizSucceedType } from '@/types/domain';
import { FlexSpaceBetween, PostSection } from '@/styles/layout';
import PageTitle from '@/components/layout/PageTitle';
import { quizTimeState, quizTitleState } from '@/atoms/quiz';
import QuizCounter from '@/components/atoms/QuizCounter';
import useCount from '@/hooks/useCount';
import QuizTimer from '@/components/atoms/QuizTimer';
import QuizPost from '@/components/organisms/QuizPost';
import useQuizResult from '@/hooks/meca/useQuizResult';

const QuizTitleBox = styled.div`
  ${FlexSpaceBetween};
  margin-bottom: 6px;
`;

type QuizPhaseSucceedHandlerType = Omit<Record<QuizPhaseType, QuizSucceedType>, 'result'>;

const QuizPage = () => {
  const quizTitle = useRecoilValue(quizTitleState);
  const quizPhaseTime = useRecoilValue(quizTimeState);
  const { quizList, solveQuiz, applyQuizResult } = useQuizResult();
  const { number: round, increaseNumber: setNextRound } = useCount(1, 1, quizList.length);
  const [quizPhase, setQuizPhase] = useState<QuizPhaseType>('progress');
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
      solveQuiz(quizList[quizIndex].cardId, answer);
    },
    [round, quizIndex],
  );

  const showQuizResultHandler = () => {
    applyQuizResult(quizList.map((quiz) => quiz.result as QuizResultType));
    setQuizPhase('result');
  };

  useEffect(() => {
    if (quizPhase !== 'progress') {
      return;
    }
    const timeoutId = setTimeout(() => {
      solveQuizHandler('시간초과!');
    }, quizPhaseTime * 1000);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeoutId);
  }, [quizPhase]);

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
  return (
    <PostSection>
      <QuizTitleBox>
        <PageTitle>{quizTitle}</PageTitle>
        <QuizCounter currentCount={round} maxCount={quizList.length} />
      </QuizTitleBox>
      {quizPhase !== 'result' ? (
        <>
          {quizPhase === 'progress' ? <QuizTimer second={quizPhaseTime ?? undefined} /> : <QuizTimer />}
          <br />
          <br />
          <QuizPost
            isAnswerState={quizPhase !== 'progress'}
            question={quizList[quizIndex].question}
            answer={quizList[quizIndex].answer}
            handleSucceed={quizPhaseSucceed[quizPhase]}
            quizType={quizList[quizIndex].cardType}
          />
        </>
      ) : (
        // TODO: 결과 페이지 만들기
        <div>
          result! <Link href="/">홈으로</Link>
        </div>
      )}
    </PostSection>
  );
};

export default QuizPage;
