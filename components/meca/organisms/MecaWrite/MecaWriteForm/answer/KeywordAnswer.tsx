import InputGroup from '@/components/@common/molecules/InputGroup';

import { MecaWriteFormAnswerProps } from '../type';

export const KeywordAnswer = ({ value, onChange }: MecaWriteFormAnswerProps) => (
  <>
    <InputGroup.Label>정답을 작성하세요</InputGroup.Label>
    <InputGroup.Input.Text
      name="meca-answer-keyword"
      value={value}
      onChange={onChange}
      placeholder=""
      ariaLabel="input-meca-keyword-answer"
    />
    <InputGroup.Description
      descLists={[
        '콤마(,)로 구분하여 복수 정답 처리 가능하며 대소문자 및 공백은 구분하지 않습니다',
        '예) react,리액트',
      ]}
    />
  </>
);
