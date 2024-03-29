import styled from 'styled-components';

import BoxedSection from '@/components/@common/molecules/BoxedSection';
import InputGroup from '@/components/@common/molecules/InputGroup';

import { QuizContentWrapper } from '../styled';
import { QuizContentProps } from '../type';

const KeywordAnswerInputContainer = styled.div`
  margin-top: -24px;
  & > div > div:first-child {
    border: none;
    background-color: var(--color-lightgray);
  }
`;

const KeywordAnswerSpan = styled.span<{ isCorrectAnswer: boolean }>`
  color: ${(props) => (props.isCorrectAnswer ? 'var(--color-success)' : 'var(--color-warning)')};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const KeywordQuiz = ({
  answer,
  score,
  invalidAnswerMessage,
  isAnswerState,
  value,
  onChange,
}: QuizContentProps) => (
  <QuizContentWrapper>
    {isAnswerState ? (
      <>
        <BoxedSection header="Answer." body={answer} isColumn />
        <BoxedSection
          header="Your Answer!"
          body={<KeywordAnswerSpan isCorrectAnswer={(score ?? 0) === 100}>{value || '시간초과!!'}</KeywordAnswerSpan>}
          isColumn
        />
      </>
    ) : (
      <BoxedSection
        header="Let's Answer!"
        body={
          <KeywordAnswerInputContainer>
            <InputGroup>
              <InputGroup.Input.Text name="quiz" value={value} onChange={onChange} placeholder="정답 입력" />
              {invalidAnswerMessage && (
                <InputGroup.Validation visible={!!invalidAnswerMessage}>{invalidAnswerMessage}</InputGroup.Validation>
              )}
            </InputGroup>
          </KeywordAnswerInputContainer>
        }
        isColumn
      />
    )}
  </QuizContentWrapper>
);
