import React from 'react';

import InputGroup from '@/components/molcules/InputGroup';

import { MecaWriteFormInputProps } from '../type';

const KeywordQuestion = ({ value, onChange }: MecaWriteFormInputProps) => (
  <div>
    <InputGroup>
      <InputGroup.Label>키워드 퀴즈 문제를 설명하세요</InputGroup.Label>
      <InputGroup.Input.TextArea
        name="meca-question"
        value={value}
        onChange={onChange}
        placeholder="문제를 설명하세요"
        ariaLabel="input-meca-keyword-question"
      />
    </InputGroup>
  </div>
);

export default KeywordQuestion;
