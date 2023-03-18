import React from 'react';

import InputGroup from '@/components/molcules/InputGroup';

import { MecaWriteFormInputProps } from '../type';

const OxQuestion = ({ value, onChange }: MecaWriteFormInputProps) => (
  <div>
    <InputGroup>
      <InputGroup.Label>OX퀴즈 문제를 설명하세요</InputGroup.Label>
      <InputGroup.Input.TextArea
        name="meca-question"
        value={value}
        onChange={onChange}
        placeholder="문제를 설명하세요"
        ariaLabel="input-meca-ox-question"
      />
    </InputGroup>
  </div>
);

export default OxQuestion;
