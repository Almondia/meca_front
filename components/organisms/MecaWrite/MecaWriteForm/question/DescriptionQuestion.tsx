import InputGroup from '@/components/molcules/InputGroup';

import { MecaWriteFormInputProps } from '../type';

const DescriptionQuestion = ({ value, onChange }: MecaWriteFormInputProps) => (
  <>
    <InputGroup.Label>주관식 퀴즈 문제를 설명하세요</InputGroup.Label>
    <InputGroup.Input.TextArea
      name="meca-question"
      value={value}
      onChange={onChange}
      placeholder="문제를 설명하세요"
      ariaLabel="input-meca-description-question"
    />
  </>
);

export default DescriptionQuestion;
