import { RefObject, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import InputGroup from '@/components/@common/molecules/InputGroup';
import NumberIncrementer from '@/components/@common/molecules/NumberIncrementer';
import QuillWriter from '@/components/@common/organisms/Editor/QuillWriter';
import MecaUploadButtonGroup from '@/components/meca/molecules/MecaUploadButtonGroup';
import useMecaWrite from '@/hooks/meca/useMecaWrite';
import useIncrease from '@/hooks/useCount';
import useInput from '@/hooks/useInput';
import useInputValidation from '@/hooks/useInputValidation';
import { MecaTagType, MecaType } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { Constraints } from '@/utils/validation';

import { DescriptionAnswer, KeywordAnswer, OxAnswer, SelectAnswer } from './answer';
import { DescriptionQuestion, KeywordQuestion, OxQuestion, SelectQuestion } from './question';
import { MecaWriteAnswerComponentType, MecaWriteQuestionComponentType } from './type';

const QUESTION_COMPONENTS: Record<MecaTagType, MecaWriteQuestionComponentType> = {
  OX_QUIZ: OxQuestion,
  ESSAY: DescriptionQuestion,
  KEYWORD: KeywordQuestion,
  MULTI_CHOICE: SelectQuestion,
};

const ANSWER_COMPONENTS: Record<MecaTagType, MecaWriteAnswerComponentType> = {
  OX_QUIZ: OxAnswer,
  ESSAY: DescriptionAnswer,
  KEYWORD: KeywordAnswer,
  MULTI_CHOICE: SelectAnswer,
};

export interface MecaWriteFormProps extends Partial<MecaType> {
  titleRef: RefObject<HTMLDivElement>;
  categoryId: string;
  mecaTagType: MecaTagType;
}
// TODO: Context Provider 방식으로 변경하면 좋을듯
const MecaWriteForm = ({
  mecaTagType,
  titleRef,
  cardId,
  categoryId,
  title,
  answer,
  question,
  description,
}: MecaWriteFormProps) => {
  const { createMeca, updateMeca } = useMecaWrite();
  const { input: titleInput, onInputChange: onTitleChange } = useInput(title ?? '');
  const { input: descInput, setInput: setDescInput } = useInput(description ?? '');
  const { input: questionInput, setInput: setQuestionInput } = useInput(question ?? '');
  const { input: answerInput, onInputChange: onAnswerChange, setInput: setAnswerInput } = useInput(answer ?? '');
  const { number: caseNum, increaseNumber: changeCaseNum } = useIncrease(
    question && mecaTagType === 'MULTI_CHOICE' ? JSON.parse(question).length - 1 : 3,
    3,
    5,
  );
  const [Question, setQuestion] = useState<MecaWriteQuestionComponentType | undefined>(undefined);
  const [Answer, setAnswer] = useState<MecaWriteAnswerComponentType | undefined>(undefined);
  const { inputsValidState, validateAll, resetValidateState } = useInputValidation(3);
  useEffect(() => {
    setQuestion(() => QUESTION_COMPONENTS[mecaTagType]);
    setAnswer(() => ANSWER_COMPONENTS[mecaTagType]);
    resetValidateState();
    if (!cardId && questionInput) {
      setQuestionInput((prev) => (mecaTagType === 'MULTI_CHOICE' ? JSON.stringify([prev]) : prev));
    }
    return () => {
      if (cardId) {
        return;
      }
      setQuestionInput(
        (prev) =>
          getQuestionAnswerByCardType({
            question: prev,
            cardType: mecaTagType,
          }).question,
      );
      setAnswerInput(answer ?? '');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mecaTagType]);

  if (!titleRef.current) {
    return null;
  }
  const handleCreateButtonClick = () => {
    const { hasInvalid } = validateAll([
      () => Constraints.cardTitle(titleInput),
      () => Constraints.cardQuestion(questionInput, mecaTagType),
      () => Constraints.cardAnswer(answerInput, mecaTagType),
    ]);
    if (hasInvalid) {
      return;
    }
    // TODO: validation 로직 추가
    const body = {
      title: titleInput,
      categoryId,
      question: questionInput,
      description: descInput,
      answer: answerInput,
    };
    cardId ? updateMeca({ ...body, cardId }) : createMeca({ ...body, cardType: mecaTagType });
  };

  return (
    <div>
      {createPortal(
        <InputGroup>
          <InputGroup.Input.Title
            value={titleInput}
            onChange={onTitleChange}
            placeholder="제목 추가"
            name="meca-title"
            isValid={inputsValidState[0].isValid}
            ariaLabel="input-meca-title"
          />
          <InputGroup.Validation visible={!inputsValidState[0].isValid}>
            {inputsValidState[0].message}
          </InputGroup.Validation>
        </InputGroup>,
        titleRef.current,
      )}
      {Question && (
        <InputGroup>
          <Question value={questionInput} setValue={setQuestionInput} selectionNum={caseNum} />
          <InputGroup.Validation visible={!inputsValidState[1].isValid}>
            {inputsValidState[1].message}
          </InputGroup.Validation>
        </InputGroup>
      )}
      {mecaTagType === 'MULTI_CHOICE' && (
        <InputGroup>
          <InputGroup.Label>문항 수를 선택하세요</InputGroup.Label>
          <NumberIncrementer value={caseNum} onChange={changeCaseNum} />
        </InputGroup>
      )}
      {Answer && (
        <InputGroup>
          <Answer value={answerInput} onChange={onAnswerChange} selectionNum={caseNum} />
          <InputGroup.Validation visible={!inputsValidState[2].isValid}>
            {inputsValidState[2].message}
          </InputGroup.Validation>
        </InputGroup>
      )}
      <br />
      <InputGroup>
        <InputGroup.Label>문제를 설명하세요</InputGroup.Label>
        <QuillWriter contents={descInput} setContents={setDescInput} />
      </InputGroup>
      <br />
      <br />
      <MecaUploadButtonGroup onSubmit={handleCreateButtonClick} />
    </div>
  );
};

export default MecaWriteForm;
