import { useState } from 'react';

import type { Quiz } from '@/types/domain/quiz';

import EmptyList from '@/components/@common/atoms/EmptyList';
import InfiniteList from '@/components/@common/molecules/InfiniteList';
import QuizTimelineItem from '@/components/quiz/organisms/QuizTimelineItem';
import { extractTextFromHTML } from '@/utils/htmlTextHandler';

import { QuizPlayResultTimelineWrapper } from './styled';

interface QuizResultTimelineProps {
  quizList: Quiz[];
}

const QuizPlayResultTimeline = ({ quizList }: QuizResultTimelineProps) => {
  const [currentQuizList, setCurrentQuizList] = useState(quizList.slice(0, 5));
  const isEmpty = currentQuizList.length === 0;
  const loadMore = () => {
    setCurrentQuizList((prev) => quizList.slice(0, prev.length + 5));
  };
  if (isEmpty) {
    return <EmptyList subInfo="문제 풀이 결과" />;
  }
  return (
    <QuizPlayResultTimelineWrapper>
      <InfiniteList type="wide" hasNext={currentQuizList.length < quizList.length} loadMore={loadMore}>
        {currentQuizList.map((quiz, idx) => {
          const quizResult = quiz.result;
          if (!quizResult) {
            return null;
          }
          return (
            <QuizTimelineItem
              key={quiz.cardId}
              unindented={idx !== 0}
              left={idx % 2 === 0}
              {...quiz}
              question={extractTextFromHTML(quiz.question)}
              createdAt={undefined}
              {...quizResult}
              scorePostfixText={`${quizResult.spendTime}초`}
            />
          );
        })}
      </InfiniteList>
    </QuizPlayResultTimelineWrapper>
  );
};
export default QuizPlayResultTimeline;
