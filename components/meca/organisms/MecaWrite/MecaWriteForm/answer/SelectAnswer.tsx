/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import useRadio from '@/hooks/useRadio';

import { MecaWriteFormAnswerProps } from '../type';

export const SelectAnswer = ({ value, onChange, selectionNum }: MecaWriteFormAnswerProps) => {
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
