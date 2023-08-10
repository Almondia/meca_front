import InputGroup from '@/components/@common/molecules/InputGroup';
import { useMecaAnswerContext } from '@/components/meca/molecules/MecaWriteContextProvider';

export const Essay = () => {
  const { input, onInputChange, isValid, message } = useMecaAnswerContext();
  return (
    <InputGroup>
      <InputGroup.Label>정답을 작성하세요</InputGroup.Label>
      <InputGroup.Input.TextArea
        name="meca-answer-keyword"
        value={input}
        onChange={onInputChange}
        placeholder=""
        ariaLabel="input-meca-description-answer"
      />
      <InputGroup.Validation visible={!isValid}>{message}</InputGroup.Validation>
    </InputGroup>
  );
};
