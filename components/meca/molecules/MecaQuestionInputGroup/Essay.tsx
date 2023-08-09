import { memo } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import { QuestionInputGroupProps } from '@/components/meca/molecules/MecaQuestionInputGroup/types';
import { useMecaQuestionContext } from '@/components/meca/molecules/MecaWriteContextProvider';

export const Essay = memo(({ QuestionEditor, minHeight, maxHeight }: QuestionInputGroupProps) => {
  const { input: value, setInput: setValue, isValid, message } = useMecaQuestionContext();
  return (
    <InputGroup>
      <InputGroup.Label>주관식 퀴즈 문제를 설명하세요</InputGroup.Label>
      <QuestionEditor
        minHeight={minHeight}
        maxHeight={maxHeight}
        contents={value}
        setContents={setValue}
        placeholder="주관식 문제를 설명하세요"
      />
      <InputGroup.Validation visible={!isValid}>{message}</InputGroup.Validation>
    </InputGroup>
  );
});
