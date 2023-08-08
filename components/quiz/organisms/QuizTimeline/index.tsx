/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import ColorizedScore from '@/components/@common/atoms/ColorizedScore';
import QuizResultItem from '@/components/quiz/molecules/QuizResultItem';
import { COLOR } from '@/styles/constants';
import { QuizResultType, QuizType } from '@/types/domain';
import { IDEAL_QUIZ_SCORE } from '@/utils/constants';
import { extractTextFromHTML } from '@/utils/htmlTextHandler';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';

import {
  QuizActivityContainer,
  QuizTimelineActivity,
  QuizTimelineBadge,
  QuizTimelineMoreButton,
  QuizTimelineSummary,
  QuizTimelineWrapper,
} from './styled';

interface QuizTimelineProps {
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
          const { question, answer } = getQuestionAnswerByCardType({ ...quiz });
          const { answer: userAnswer } = getQuestionAnswerByCardType({ ...quiz, answer: quiz.result?.userAnswer });
          const answerColor = quizResult.score >= IDEAL_QUIZ_SCORE ? COLOR.success : COLOR.warning;
          return (
            <QuizTimelineActivity key={quiz.cardId}>
              <QuizTimelineSummary>
                <p>
                  <ColorizedScore score={quizResult.score} size="caption" hasPostFixText />
                </p>
                <p>
                  <strong>{quizResult.spendTime}초</strong>
                </p>
              </QuizTimelineSummary>
              <QuizTimelineBadge color={answerColor}>
                <p />
              </QuizTimelineBadge>
              <QuizResultItem
                question={extractTextFromHTML(question)}
                answer={answer}
                userAnswer={userAnswer}
                quizType={quiz.cardType}
              />
            </QuizTimelineActivity>
          );
        })}
      </QuizActivityContainer>
      {quizList.length > 6 && (
        <QuizTimelineMoreButton onClick={handleMoreButtonClick}>{isMore ? '숨기기' : '펼치기'}</QuizTimelineMoreButton>
      )}
    </QuizTimelineWrapper>
  );
};

export default QuizTimeline;
