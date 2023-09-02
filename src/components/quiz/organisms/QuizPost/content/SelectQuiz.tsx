/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';

import RadioGroup from '@/components/@common/atoms/Input/Radio';
import BoxedSection from '@/components/@common/molecules/BoxedSection';
import { NonVisibleRadioBox } from '@/styles/common';
import { COLOR } from '@/styles/constants';
import { FlexColumnCenter } from '@/styles/layout';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

import { SelectQuizContentWrapper } from '../styled';
import { QuizContentProps } from '../type';

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
  & > div {
    background-color: ${(props) => props.bgColor};
  }
  color: ${(props) => (props.bgColor !== 'inherit' ? COLOR.txtLight : 'var(--color-text)')};
  opacity: ${(props) => (props.isNotAnswer ? 0.5 : 1)};
`;

export const SelectQuiz = ({ cardId, question, answer, isAnswerState, value, onChange }: QuizContentProps) => {
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
    <SelectQuizContentWrapper>
      <SelectGroup>
        {questions.slice(1).map((q, index) => (
          <RadioGroup.Radio
            key={`${cardId}-${index}`}
            name="quiz"
            value={(index + 1).toString()}
            onChange={onChange}
            disabled={isAnswerState}
          >
            <SelectBox
              bgColor={setBoxBackgroundColor(index)}
              isNotAnswer={isAnswerState && answer !== (index + 1).toString()}
            >
              <BoxedSection header={`(${index + 1})`} body={q} />
            </SelectBox>
          </RadioGroup.Radio>
        ))}
      </SelectGroup>
    </SelectQuizContentWrapper>
  );
};
