/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import ColorizedScore from '@/components/atoms/ColorizedScore';
import MecaTag from '@/components/molcules/MecaTag';
import { TextCaption } from '@/styles/common';
import { COLOR } from '@/styles/constants';
import { MECA_RESPONE_TO_TAG, QuizResultType, QuizType } from '@/types/domain';
import { IDEAL_QUIZ_SCORE } from '@/utils/constants';
import { extractTextFromHTML } from '@/utils/htmlTextHandler';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';

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
              <QuizTimelineContent>
                <TextCaption>
                  <strong>
                    <p>[문제 질문]</p>
                    <MecaTag tagName={MECA_RESPONE_TO_TAG[quiz.cardType]} scale={0.7} />
                  </strong>
                  <span>{extractTextFromHTML(question)}</span>
                </TextCaption>
                <TextCaption>
                  <strong>[문제 정답]</strong>
                  <span>{answer}</span>
                </TextCaption>
                <TextCaption>
                  <strong>[나의 풀이]</strong>
                  <span>{userAnswer}</span>
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
