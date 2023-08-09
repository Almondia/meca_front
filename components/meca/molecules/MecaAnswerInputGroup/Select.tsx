/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import NumberIncrementer from '@/components/@common/molecules/NumberIncrementer';
import {
  useMecaAnswerContext,
  useMecaSelectTypeCaseNumberContext,
} from '@/components/meca/molecules/MecaWriteContextProvider';
import useRadio from '@/hooks/useRadio';

export const Select = () => {
  const { input: value, onInputChange: onChange } = useMecaAnswerContext();
  const { number: selectionNum, increaseNumber: changeCaseNum } = useMecaSelectTypeCaseNumberContext();
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
    <InputGroup>
      <InputGroup.Label>문항 수를 선택하세요</InputGroup.Label>
      <NumberIncrementer value={selectionNum} onChange={changeCaseNum} />
      <br />
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
    </InputGroup>
  );
};
