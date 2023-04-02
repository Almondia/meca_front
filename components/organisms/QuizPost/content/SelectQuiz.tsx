/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import RadioGroup from '@/components/atoms/Input/Radio';
import QuizBox from '@/components/atoms/QuizBox';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';
import { FlexColumnCenter } from '@/styles/layout';
import { COLOR } from '@/styles/constants';
import { NonVisibleRadioBox } from '@/styles/common';

import { QuizContentProps } from '../type';
import { QuizContentWrapper } from '../styled';

const SelectGroup = styled(NonVisibleRadioBox)`
  ${FlexColumnCenter};
  align-items: stretch;
  row-gap: 14px;
`;

const SelectBox = styled.div<{ bgColor: string; isNotAnswer?: boolean }>`
  border-radius: ${({ theme }) => theme.border.card};
  :hover {
    ${(props) => !props.isNotAnswer && `border-left: 3px solid var(--color-subbrand)`};
  }
  background-color: ${(props) => props.bgColor};
  color: ${(props) => (props.bgColor !== 'inherit' ? 'var(--color-background)' : 'var(--color-text)')};
  opacity: ${(props) => (props.isNotAnswer ? 0.5 : 1)};
`;

const SelectQuiz = ({ question, answer, isAnswerState, value, onChange }: QuizContentProps) => {
  const questions = stringToJsonStringArrayConverter(question);
  const setBoxBackgroundColor = (index: number) => {
    const indexAnswer = (index + 1).toString();
    if (isAnswerState) {
      if (answer === indexAnswer) {
        return COLOR.success;
      }
      if (value === indexAnswer) {
        return COLOR.error;
      }
    }
    return value === indexAnswer ? 'var(--color-subbrand)' : 'inherit';
  };
  return (
    <QuizContentWrapper>
      <QuizBox header="Q." body={questions[0]} isColumn />
      <SelectGroup>
        {questions.slice(1).map((qs, index) => (
          <RadioGroup.Radio
            key={index}
            name="quiz"
            value={(index + 1).toString()}
            onChange={onChange}
            disabled={isAnswerState}
          >
            <SelectBox
              bgColor={setBoxBackgroundColor(index)}
              isNotAnswer={isAnswerState && answer !== (index + 1).toString()}
            >
              <QuizBox header={`(${index + 1})`} body={qs} />
            </SelectBox>
          </RadioGroup.Radio>
        ))}
      </SelectGroup>
    </QuizContentWrapper>
  );
};

export default SelectQuiz;
