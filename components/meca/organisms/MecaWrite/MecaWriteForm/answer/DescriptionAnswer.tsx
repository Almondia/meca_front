import InputGroup from '@/components/@common/molecules/InputGroup';

import { MecaWriteFormAnswerProps } from '../type';

export const DescriptionAnswer = ({ value, onChange }: MecaWriteFormAnswerProps) => (
  <>
    <InputGroup.Label>정답을 작성하세요</InputGroup.Label>
    <InputGroup.Input.TextArea
      name="meca-answer-keyword"
      value={value}
      onChange={onChange}
      placeholder=""
      ariaLabel="input-meca-description-answer"
    />
  </>
);
