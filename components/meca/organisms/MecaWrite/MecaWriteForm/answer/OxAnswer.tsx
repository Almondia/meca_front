import { useEffect } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import useRadio from '@/hooks/useRadio';

import { MecaWriteFormAnswerProps } from '../type';

export const OxAnswer = ({ value, onChange }: MecaWriteFormAnswerProps) => {
  const { fieldSet: fieldSetRef, forceClick } = useRadio();

  useEffect(() => {
    forceClick(value || 'O', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InputGroup.Label>정답을 선택하세요</InputGroup.Label>
      <InputGroup.Input.ForwardRadioGroup ref={fieldSetRef}>
        <InputGroup.Input.RadioGroup.Radio
          name="meca-answer-ox"
          value="O"
          onChange={onChange}
          ariaLabel="input-meca-ox-answer-o"
          defaultChecked={value !== 'X'}
        >
          O
        </InputGroup.Input.RadioGroup.Radio>
        <InputGroup.Input.RadioGroup.Radio
          name="meca-answer-ox"
          value="X"
          onChange={onChange}
          ariaLabel="input-meca-ox-answer-X"
          defaultChecked={value === 'X'}
        >
          X
        </InputGroup.Input.RadioGroup.Radio>
      </InputGroup.Input.ForwardRadioGroup>
    </>
  );
};
