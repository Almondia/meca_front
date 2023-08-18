import { memo } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import { QuestionInputGroupProps } from '@/components/meca/molecules/MecaQuestionInputGroup/types';
import { useMecaQuestionContext } from '@/components/meca/molecules/MecaWriteContextProvider';

export const Keyword = memo(({ QuestionEditor }: QuestionInputGroupProps) => {
  const { input: value, setInput: setValue, isValid, message } = useMecaQuestionContext();
  return (
    <InputGroup>
      <InputGroup.Label>키워드 퀴즈 문제를 설명하세요</InputGroup.Label>
      <QuestionEditor contents={value} setContents={setValue} placeholder="키워드 문제를 설명하세요" />
      <InputGroup.Validation visible={!isValid}>{message}</InputGroup.Validation>
    </InputGroup>
  );
});
