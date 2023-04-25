import styled from 'styled-components';

import Icon from '@/components/atoms/Icon';
import RadioGroup from '@/components/atoms/Input/Radio';
import QuizBox from '@/components/atoms/QuizBox';
import InputGroup from '@/components/molcules/InputGroup';
import { NonVisibleRadioBox } from '@/styles/common';
import { COLOR } from '@/styles/constants';

import { QuizContentWrapper } from '../styled';
import { QuizContentProps } from '../type';

const SelectGroup = styled(NonVisibleRadioBox)`
  display: flex;
  justify-content: stretch;
  column-gap: 20px;
  padding: 20px;
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

const OxQuiz = ({ question, answer, isAnswerState, value, onChange }: QuizContentProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'O' || e.target.value === 'X') {
      onChange(e);
    }
  };
  return (
    <QuizContentWrapper>
      <QuizBox header="Q." body={question} isColumn />
      <InputGroup>
        <InputGroup.Label>정답을 선택하세요</InputGroup.Label>
        <SelectGroup>
          {['O', 'X'].map((ox) => (
            <RadioGroup.Radio key={ox} name="quiz" value={ox} onChange={handleChange} disabled={isAnswerState}>
              <OxIconContainer>
                {isAnswerState && ox === answer && <AnswerCircle />}
                <Icon icon={ox === 'X' ? 'Ax' : 'O'} />
                <SelectedIconContainer>
                  {value === ox && <Icon icon="Selected" color="var(--color-brand)" size="30px" />}
                </SelectedIconContainer>
              </OxIconContainer>
            </RadioGroup.Radio>
          ))}
        </SelectGroup>
      </InputGroup>
    </QuizContentWrapper>
  );
};

export default OxQuiz;
