import { useEffect, useRef } from 'react';

import styled from 'styled-components';

import Icon from '@/components/@common/atoms/Icon';
import RadioGroup from '@/components/@common/atoms/Input/Radio';
import BoxedSection from '@/components/@common/molecules/BoxedSection';
import { NonVisibleRadioBox } from '@/styles/common';
import { COLOR } from '@/styles/constants';

import { QuizContentWrapper } from '../styled';
import { QuizContentProps } from '../type';

const SelectGroup = styled(NonVisibleRadioBox)`
  display: flex;
  justify-content: stretch;
  column-gap: 20px;
  padding: 24px 0 0 0;
  margin-top: -24px;
`;

const OxIconContainer = styled.div`
  position: relative;
  border-radius: 50%;
  border: 1px solid var(--color-lightgray);
  padding: 10px;
`;

const SelectedIconContainer = styled.div`
  position: absolute;
  top: -6px;
  left: 12px;
`;

const AnswerCircle = styled.div`
  position: absolute;
  top: -10px;
  left: -12px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid ${COLOR.error};
  content: '';
`;

export const OxQuiz = ({ cardId, answer, isAnswerState, value, onChange }: QuizContentProps) => {
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'O' || e.target.value === 'X') {
      onChange(e);
    }
  };
  useEffect(
    () => () => {
      if (isAnswerState) {
        return;
      }
      const checkedRadio = fieldsetRef.current?.querySelector<HTMLInputElement>('input[type="radio"]:checked');
      if (checkedRadio) {
        checkedRadio.checked = false;
      }
    },
    [isAnswerState],
  );
  return (
    <QuizContentWrapper>
      <BoxedSection
        header="Check Answer!"
        body={
          <SelectGroup ref={fieldsetRef}>
            {['O', 'X'].map((ox) => (
              <RadioGroup.Radio
                key={`${cardId}-${ox}`}
                name="quiz"
                value={ox}
                onChange={handleChange}
                disabled={isAnswerState}
              >
                <OxIconContainer>
                  {isAnswerState && ox === answer && <AnswerCircle data-testid="id-oxquiz-post-answer-circle" />}
                  <Icon icon={ox === 'X' ? 'Ax' : 'O'} />
                  <SelectedIconContainer>
                    {value === ox && <Icon icon="Selected" color="var(--color-brand)" size="30px" />}
                  </SelectedIconContainer>
                </OxIconContainer>
              </RadioGroup.Radio>
            ))}
          </SelectGroup>
        }
        isColumn
      />
    </QuizContentWrapper>
  );
};
