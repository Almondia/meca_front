import React, { useEffect } from 'react';

import InputGroup from '@/components/molcules/InputGroup';
import useRadio from '@/hooks/useRadio';

import { MecaWriteFormInputProps } from '../type';

const OxAnswer = ({ value, onChange }: MecaWriteFormInputProps) => {
  const { fieldSet: fieldSetRef, forceClick } = useRadio();

  useEffect(() => {
    forceClick(value || 'O', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <InputGroup>
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
      </InputGroup>
    </div>
  );
};

export default OxAnswer;
