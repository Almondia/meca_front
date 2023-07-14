import InputGroup from '@/components/molcules/InputGroup';

import { MecaWriteFormAnswerProps } from '../type';

const DescriptionAnswer = ({ value, onChange }: MecaWriteFormAnswerProps) => (
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

export default DescriptionAnswer;
