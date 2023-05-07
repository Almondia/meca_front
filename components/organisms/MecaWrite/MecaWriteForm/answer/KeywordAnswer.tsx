import React from 'react';

import InputGroup from '@/components/molcules/InputGroup';

import { MecaWriteFormInputProps } from '../type';

const KeywordAnswer = ({ value, onChange, isDisabled }: MecaWriteFormInputProps) => (
  <div>
    <InputGroup>
      <InputGroup.Label>{isDisabled ? '정답' : '정답을 작성하세요'}</InputGroup.Label>
      {!isDisabled && <InputGroup.Description descLists={['정답은 수정할 수 없으니 신중하게 작성하세요!']} />}
      <InputGroup.Input.Text
        name="meca-answer-keyword"
        value={value}
        onChange={onChange}
        placeholder=""
        ariaLabel="input-meca-keyword-answer"
        disabled={isDisabled}
      />
    </InputGroup>
  </div>
);

export default KeywordAnswer;
