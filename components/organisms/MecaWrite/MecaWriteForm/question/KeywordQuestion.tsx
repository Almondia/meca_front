import React from 'react';

import QuillWriter from '@/components/molcules/Editor/QuillWriter';
import InputGroup from '@/components/molcules/InputGroup';

import { MecaWriteFormQuestionProps } from '../type';

const KeywordQuestion = ({ value, setValue }: MecaWriteFormQuestionProps) => (
  <>
    <InputGroup.Label>키워드 퀴즈 문제를 설명하세요</InputGroup.Label>
    <QuillWriter
      minHeight="150px"
      maxHeight="780px"
      contents={value}
      setContents={setValue}
      placeholder="키워드 문제를 설명하세요"
    />
  </>
);

export default KeywordQuestion;
