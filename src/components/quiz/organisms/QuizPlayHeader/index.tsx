import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import type { QuizPhase } from '@/types/domain/quiz';

import { quizTitleState } from '@/atoms/quiz';
import CountIndicator from '@/components/@common/atoms/CountIndicator';
import LinkButton from '@/components/@common/atoms/LinkButton';
import PageTitle from '@/components/@common/atoms/PageTitle';
import BetweenSection from '@/components/@common/molecules/BetweenSection';

interface QuizPlayHeaderProps {
  quizCardTitle?: string;
  quizCount: number;
  maxQuizCount: number;
  quizPhase: QuizPhase;
}

const QuizPlayHeader = ({ quizCardTitle, quizCount, maxQuizCount, quizPhase }: QuizPlayHeaderProps) => {
  const router = useRouter();
  const quizTitle = useRecoilValue(quizTitleState);

  return (
    <BetweenSection>
      <BetweenSection.Left>
        <PageTitle>{quizPhase === 'result' ? quizTitle : quizCardTitle}</PageTitle>
      </BetweenSection.Left>
      <BetweenSection.Right>
        {quizPhase === 'result' ? (
          <LinkButton onClick={() => router.back()} textSize="main">
            목록으로
          </LinkButton>
        ) : (
          <CountIndicator currentCount={quizCount} maxCount={maxQuizCount} />
        )}
      </BetweenSection.Right>
    </BetweenSection>
  );
};

export default QuizPlayHeader;
