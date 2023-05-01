import { TextCaption } from '@/styles/common';
import { COLOR } from '@/styles/constants';
import { QuizResultType, QuizType } from '@/types/domain';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

import {
  QuizTimelineActivity,
  QuizTimelineBadge,
  QuizTimelineContent,
  QuizTimelineTime,
  QuizTimelineWrapper,
} from './styled';

export interface QuizTimelineProps {
  quizList: QuizType[];
}

const QuizTimeline = ({ quizList }: QuizTimelineProps) => (
  <QuizTimelineWrapper>
    {quizList.map((quiz) => {
      const quizResult = quiz.result as Omit<QuizResultType, 'cardId'>;
      const question =
        quiz.cardType === 'MULTI_CHOICE'
          ? stringToJsonStringArrayConverter(quiz.question)[0]
          : (quiz.question as string);
      const answer =
        quiz.cardType === 'MULTI_CHOICE'
          ? stringToJsonStringArrayConverter(quiz.question)[Number(quiz.answer)]
          : quiz.answer;
      const userAnswer =
        quiz.cardType === 'MULTI_CHOICE'
          ? stringToJsonStringArrayConverter(quiz.question)[Number(quizResult.userAnswer)]
          : quizResult.userAnswer;
      const answerColor = quizResult.score >= 80 ? COLOR.success : COLOR.warning;
      return (
        <QuizTimelineActivity key={quiz.cardId}>
          <QuizTimelineTime>{quizResult.spendTime}s</QuizTimelineTime>
          <QuizTimelineBadge color={answerColor} />
          <QuizTimelineContent>
            <strong>{question}</strong>
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
  </QuizTimelineWrapper>
);

export default QuizTimeline;
