import React from 'react';

import InputGroup from '@/components/molcules/InputGroup';

import { MecaWriteFormInputProps } from '../type';

const KeywordAnswer = ({ value, onChange }: MecaWriteFormInputProps) => (
  <div>
    <InputGroup>
      <InputGroup.Label>정답을 입력하세요</InputGroup.Label>
      <InputGroup.Input.Text
        name="meca-answer-keyword"
        value={value}
        onChange={onChange}
        placeholder=""
        ariaLabel="input-meca-keyword-answer"
      />
    </InputGroup>
  </div>
);

export default KeywordAnswer;
