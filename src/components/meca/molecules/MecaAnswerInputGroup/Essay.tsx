import InputGroup from '@/components/@common/molecules/InputGroup';
import { useMecaAnswerContext } from '@/components/meca/molecules/MecaWriteContextProvider';
import { InputValidations } from '@/utils/constants';

export const Essay = () => {
  const { input, onInputChange, isValid, message } = useMecaAnswerContext();
  return (
    <InputGroup>
      <InputGroup.Label>정답을 작성하세요</InputGroup.Label>
      <InputGroup.Input.TextArea
        name="meca-answer-keyword"
        value={input}
        onChange={onInputChange}
        placeholder={`${InputValidations.MAX_ESSAY_ANSWER}자 이내로 작성하세요`}
        ariaLabel="input-meca-description-answer"
      />
      <InputGroup.Validation visible={!isValid}>{message}</InputGroup.Validation>
    </InputGroup>
  );
};
