import React, { useEffect } from 'react';

import InputGroup from '@/components/molcules/InputGroup';
import useRadio from '@/hooks/useRadio';

import { MecaWriteFormInputProps } from '../type';

const OxAnswer = ({ value, onChange, isDisabled }: MecaWriteFormInputProps) => {
  const { fieldSet: fieldSetRef, forceClick } = useRadio();

  useEffect(() => {
    forceClick(value || 'O', onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <InputGroup>
        <InputGroup.Label>{isDisabled ? '정답' : '정답을 선택하세요'}</InputGroup.Label>
        {!isDisabled && <InputGroup.Description descLists={['정답은 수정할 수 없으니 신중하게 선택하세요!']} />}
        <InputGroup.Input.ForwardRadioGroup ref={fieldSetRef}>
          <InputGroup.Input.RadioGroup.Radio
            name="meca-answer-ox"
            value="O"
            onChange={onChange}
            ariaLabel="input-meca-ox-answer-o"
            defaultChecked={value !== 'X'}
            disabled={isDisabled}
          >
            O
          </InputGroup.Input.RadioGroup.Radio>
          <InputGroup.Input.RadioGroup.Radio
            name="meca-answer-ox"
            value="X"
            onChange={onChange}
            ariaLabel="input-meca-ox-answer-X"
            defaultChecked={value === 'X'}
            disabled={isDisabled}
          >
            X
          </InputGroup.Input.RadioGroup.Radio>
        </InputGroup.Input.ForwardRadioGroup>
      </InputGroup>
    </div>
  );
};

export default OxAnswer;
