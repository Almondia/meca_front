import React from 'react';

import QuillWriter from '@/components/molcules/Editor/QuillWriter';
import InputGroup from '@/components/molcules/InputGroup';

import { MecaWriteFormQuestionProps } from '../type';

const OxQuestion = ({ value, setValue }: MecaWriteFormQuestionProps) => (
  <>
    <InputGroup.Label>OX퀴즈 문제를 설명하세요</InputGroup.Label>
    <QuillWriter
      minHeight="150px"
      maxHeight="780px"
      contents={value}
      setContents={setValue}
      ariaLabel="input-meca-ox-question"
    />
  </>
);

export default OxQuestion;
