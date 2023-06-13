/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import InputGroup from '@/components/molcules/InputGroup';
import useRadio from '@/hooks/useRadio';

import { MecaWriteFormInputProps } from '../type';

const SelectAnswer = ({ value, onChange, selectionNum }: MecaWriteFormInputProps) => {
  const { fieldSet: fieldSetRef, forceClick, hasCheckedRadio } = useRadio();

  useEffect(() => {
    !value && forceClick('1', onChange);
  }, []);

  useEffect(() => {
    if (selectionNum && !hasCheckedRadio()) {
      forceClick(selectionNum.toString(), onChange);
    }
  }, [selectionNum]);

  return (
    <>
      <InputGroup.Label>정답을 선택하세요</InputGroup.Label>
      <InputGroup.Input.ForwardRadioGroup ref={fieldSetRef}>
        {[...Array(selectionNum)].map((_, i) => (
          <InputGroup.Input.RadioGroup.Radio
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            name="meca-answer"
            value={(i + 1).toString()}
            onChange={onChange}
            defaultChecked={i === 0 && !value ? true : value === (i + 1).toString()}
          >
            {i + 1}
          </InputGroup.Input.RadioGroup.Radio>
        ))}
      </InputGroup.Input.ForwardRadioGroup>
    </>
  );
};

export default SelectAnswer;
