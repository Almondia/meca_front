import InputGroup from '@/components/@common/molecules/InputGroup';
import { useMecaAnswerContext } from '@/components/meca/molecules/MecaWriteContextProvider';

export const Keyword = () => {
  const { input, onInputChange, isValid, message } = useMecaAnswerContext();
  return (
    <InputGroup>
      <InputGroup.Label>정답을 작성하세요</InputGroup.Label>
      <InputGroup.Input.Text
        name="meca-answer-keyword"
        value={input}
        onChange={onInputChange}
        placeholder=""
        ariaLabel="input-meca-keyword-answer"
      />
      <InputGroup.Validation visible={!isValid}>{message}</InputGroup.Validation>
      <InputGroup.Description
        descLists={[
          '콤마(,)로 구분하여 복수 정답 처리 가능하며 대소문자 및 공백은 구분하지 않습니다',
          '예) react,리액트',
        ]}
      />
    </InputGroup>
  );
};
