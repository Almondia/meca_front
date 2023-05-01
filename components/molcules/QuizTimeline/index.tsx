/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import { TextCaption } from '@/styles/common';
import { COLOR } from '@/styles/constants';
import { QuizResultType, QuizType } from '@/types/domain';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

import {
  QuizActivityContainer,
  QuizTimelineActivity,
  QuizTimelineBadge,
  QuizTimelineContent,
  QuizTimelineSummary,
  QuizTimelineWrapper,
  QuizTimeMoreButton,
} from './styled';

export interface QuizTimelineProps {
  quizList: QuizType[];
}

const QuizTimeline = ({ quizList }: QuizTimelineProps) => {
  const [isMore, setIsMore] = useState<boolean>(false);
  const handleMoreButtonClick = () => {
    setIsMore((prev) => !prev);
  };
  return (
    <QuizTimelineWrapper>
      <QuizActivityContainer>
        {(isMore ? quizList : quizList.slice(0, 6)).map((quiz) => {
          const quizResult = quiz.result as Omit<QuizResultType, 'cardId'>;
          const question =
            quiz.cardType === 'MULTI_CHOICE'
              ? stringToJsonStringArrayConverter(quiz.question)[0]
              : (quiz.question as string);
          const answer = !quiz.answer
            ? '미제출'
            : quiz.cardType === 'MULTI_CHOICE'
            ? stringToJsonStringArrayConverter(quiz.question)[Number(quiz.answer)]
            : quiz.answer;
          const userAnswer =
            quiz.cardType === 'MULTI_CHOICE'
              ? stringToJsonStringArrayConverter(quiz.question)[Number(quizResult.userAnswer)]
              : quizResult.userAnswer;
          const answerColor = quizResult.score >= 80 ? COLOR.success : COLOR.warning;
          return (
            <QuizTimelineActivity key={quiz.cardId}>
              <QuizTimelineSummary>
                <p>{quizResult.spendTime}초</p>
                <p>{quizResult.score}점</p>
              </QuizTimelineSummary>
              <QuizTimelineBadge color={answerColor} />
              <QuizTimelineContent>
                <TextCaption>
                  <strong>{question}</strong>
                </TextCaption>
                <TextCaption>
                  문제 정답: <strong>{answer}</strong>
                </TextCaption>
                <TextCaption>
                  나의 풀이: <strong>{userAnswer}</strong>
                </TextCaption>
              </QuizTimelineContent>
            </QuizTimelineActivity>
          );
        })}
      </QuizActivityContainer>
      {quizList.length > 6 && (
        <QuizTimeMoreButton onClick={handleMoreButtonClick}>{isMore ? '숨기기' : '펼치기'}</QuizTimeMoreButton>
      )}
    </QuizTimelineWrapper>
  );
};

export default QuizTimeline;
