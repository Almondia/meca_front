import styled from 'styled-components';

import ColorizedScore from '@/components/@common/atoms/ColorizedScore';
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

const AnswerBetweenHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .score {
    font-size: ${({ theme }) => theme.fontSize.sub};
    font-family: ${({ theme }) => theme.fontFamily.pretendard};
  }
`;

export const EssayQuiz = ({
  answer,
  invalidAnswerMessage,
  isAnswerState,
  value,
  score,
  onChange,
}: QuizContentProps) => (
  <QuizContentWrapper>
    {isAnswerState ? (
      <>
        <BoxedSection header="Answer." body={answer} isColumn />
        <BoxedSection
          header={
            <AnswerBetweenHeader>
              <p>Your Answer.</p>
              {isAnswerState && (
                <p className="score">
                  score: <ColorizedScore score={score ?? 0} size="sub" />
                </p>
              )}
            </AnswerBetweenHeader>
          }
          body={value || <span style={{ color: 'var(--color-warning)' }}>시간초과!!</span>}
          isColumn
        />
      </>
    ) : (
      <BoxedSection
        header="Let's Answer!"
        body={
          <KeywordAnswerInputContainer>
            <InputGroup>
              <InputGroup.Input.TextArea
                name="quiz"
                value={value}
                onChange={onChange}
                placeholder="정답을 설명해보세요"
                disabled={isAnswerState}
              />
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
