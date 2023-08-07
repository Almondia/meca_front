import InputGroup from '@/components/@common/molecules/InputGroup';
import QuillWriter from '@/components/@common/organisms/Editor/QuillWriter';

import { MecaWriteFormQuestionProps } from '../type';

export const DescriptionQuestion = ({ value, setValue }: MecaWriteFormQuestionProps) => (
  <>
    <InputGroup.Label>주관식 퀴즈 문제를 설명하세요</InputGroup.Label>
    <QuillWriter
      minHeight="150px"
      maxHeight="780px"
      contents={value}
      setContents={setValue}
      placeholder="주관식 문제를 설명하세요"
    />
  </>
);
