import type { MecaTag } from '@/types/domain/meca';

import ColorizedScore from '@/components/@common/atoms/ColorizedScore';
import RelativeDate from '@/components/@common/atoms/RelativeDate';
import Card from '@/components/@common/molecules/Card';
import IconTag from '@/components/@common/molecules/IconTag';
import QuizEllipsisContent from '@/components/quiz/molecules/QuizEllipsisContent';
import { TextCaption } from '@/styles/common';
import { IDEAL_QUIZ_SCORE, MECA_TAGS } from '@/utils/constants';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';

import * as ST from './styled';

export interface QuizTimelineItemProps extends ST.DefaultStyleProps {
  title: string;
  cardLink?: string;
  question: string;
  answer: string;
  userAnswer: string;
  score: number;
  cardType: MecaTag;
  scorePostfixText?: string;
  createdAt?: string;
}

const QuizTimelineItem = ({
  left = true,
  unindented = true,
  title,
  cardLink,
  question,
  answer,
  userAnswer,
  score,
  cardType,
  scorePostfixText,
  createdAt,
}: QuizTimelineItemProps) => {
  const answerColor = score >= IDEAL_QUIZ_SCORE ? 'var(--color-success)' : 'var(--color-error)';
  const { question: questionText, answer: answerText } = getQuestionAnswerByCardType({ question, answer, cardType });
  const { answer: userAnswerText } = getQuestionAnswerByCardType({ question, answer: userAnswer, cardType });
  return (
    <ST.Wrapper data-testid="id-timeline-item" left={left} unindented={unindented}>
      <ST.TimelineCard left={left}>
        <Card>
          <Card.Title link={cardLink}>{title}</Card.Title>
          <Card.Body>
            <QuizEllipsisContent title="문제질문" content={questionText} />
            <QuizEllipsisContent title="문제정답" content={answerText} />
            <QuizEllipsisContent title="제출답안" content={userAnswerText} />
            <ST.TagContainer>
              <IconTag {...MECA_TAGS[cardType]} scale={0.8} />
            </ST.TagContainer>
          </Card.Body>
        </Card>
        <ST.TimelineCardBubbleArea />
        <ST.TimelineCardBubble left={left} />
      </ST.TimelineCard>
      <ST.VerticallineBox>
        <ST.VerticalLinePoint color={answerColor} />
      </ST.VerticallineBox>
      <ST.TimelineSubInfoBox left={left}>
        <div>
          <ColorizedScore score={score} size="large" />
          <span style={{ fontSize: '0.875rem' }}>점 {scorePostfixText && `· ${scorePostfixText}`}</span>
        </div>
        <TextCaption>{createdAt && <RelativeDate date={createdAt} />}</TextCaption>
      </ST.TimelineSubInfoBox>
    </ST.Wrapper>
  );
};

export default QuizTimelineItem;
