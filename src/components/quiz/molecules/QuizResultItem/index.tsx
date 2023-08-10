import IconTag from '@/components/@common/molecules/IconTag';
import { MecaTagType } from '@/types/domain';
import { MECA_TAGS } from '@/utils/constants';

import { QuizResultItemTitleGroup, QuizResultItemWrapper } from './styled';

export interface QuizResultItemProps {
  question: string;
  answer: string;
  userAnswer: string;
  quizType?: MecaTagType;
}

const QuizResultItem = ({ question, answer, userAnswer, quizType }: QuizResultItemProps) => (
  <QuizResultItemWrapper>
    <div>
      <QuizResultItemTitleGroup>
        <strong>[문제 질문]</strong>
        {quizType && <IconTag {...MECA_TAGS[quizType]} scale={0.7} />}
      </QuizResultItemTitleGroup>
      <span>{question}</span>
    </div>
    <div>
      <QuizResultItemTitleGroup>
        <strong>[문제 정답]</strong>
      </QuizResultItemTitleGroup>
      <span>{answer}</span>
    </div>
    <div>
      <QuizResultItemTitleGroup>
        <strong>[제출 결과]</strong>
      </QuizResultItemTitleGroup>
      <span>{userAnswer}</span>
    </div>
  </QuizResultItemWrapper>
);
export default QuizResultItem;
