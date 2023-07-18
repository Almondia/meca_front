import styled from 'styled-components';

import ContentsBox from '@/components/atoms/ContentsBox';
import QuillReader from '@/components/molcules/Editor/QuillNoSSRReader';
import InputGroup from '@/components/molcules/InputGroup';
import { TextBodyTitle } from '@/styles/common';

import { QuizContentWrapper } from '../styled';
import { QuizContentProps } from '../type';

const KeywordAnswerInputContainer = styled.div`
  margin-top: -24px;
  & > div > div {
    border: none;
    background-color: var(--color-lightgray);
  }
`;

const DescriptionQuiz = ({ question, answer, isAnswerState, value, onChange }: QuizContentProps) => (
  <QuizContentWrapper>
    <ContentsBox
      header="Question."
      isColumn
      body={
        <TextBodyTitle>
          <QuillReader content={question} />
        </TextBodyTitle>
      }
    />
    {isAnswerState ? (
      <>
        <ContentsBox header="Answer." body={answer} isColumn />
        <ContentsBox
          header="Your Answer!"
          body={value || <span style={{ color: 'var(--color-warning)' }}>시간초과!!</span>}
          isColumn
        />
      </>
    ) : (
      <ContentsBox
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
            </InputGroup>
          </KeywordAnswerInputContainer>
        }
        isColumn
      />
    )}
  </QuizContentWrapper>
);

export default DescriptionQuiz;
