import { RefObject, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import ButtonGroup from '@/components/@common/molecules/ButtonGroup';
import InputGroup from '@/components/@common/molecules/InputGroup';
import NumberIncrementer from '@/components/@common/molecules/NumberIncrementer';
import QuillWriter from '@/components/@common/organisms/Editor/QuillWriter';
import useMecaWrite from '@/hooks/meca/useMecaWrite';
import useIncrease from '@/hooks/useCount';
import useInput from '@/hooks/useInput';
import useInputValidation from '@/hooks/useInputValidation';
import { MECA_TAG_TO_RESPONSE, MecaTagType, MecaType } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { Constraints } from '@/utils/validation';

import { DescriptionAnswer, KeywordAnswer, OxAnswer, SelectAnswer } from './answer';
import { DescriptionQuestion, KeywordQuestion, OxQuestion, SelectQuestion } from './question';
import { MecaWriteAnswerComponentType, MecaWriteQuestionComponentType } from './type';

const QUESTION_COMPONENTS: Record<MecaTagType, MecaWriteQuestionComponentType> = {
  ox: OxQuestion,
  desc: DescriptionQuestion,
  keyword: KeywordQuestion,
  select: SelectQuestion,
};

const ANSWER_COMPONENTS: Record<MecaTagType, MecaWriteAnswerComponentType> = {
  ox: OxAnswer,
  desc: DescriptionAnswer,
  keyword: KeywordAnswer,
  select: SelectAnswer,
};

export interface MecaWriteFormProps extends Partial<MecaType> {
  titleRef: RefObject<HTMLDivElement>;
  categoryId: string;
  mecaTagType: MecaTagType;
}

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
    question && mecaTagType === 'select' ? JSON.parse(question).length - 1 : 3,
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
      setQuestionInput((prev) => (mecaTagType === 'select' ? JSON.stringify([prev]) : prev));
    }
    return () => {
      if (cardId) {
        return;
      }
      setQuestionInput(
        (prev) =>
          getQuestionAnswerByCardType({
            question: prev,
            cardType: MECA_TAG_TO_RESPONSE[mecaTagType],
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
    cardId ? updateMeca({ ...body, cardId }) : createMeca({ ...body, cardType: MECA_TAG_TO_RESPONSE[mecaTagType] });
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
      {mecaTagType === 'select' && (
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
      <ButtonGroup
        onSuccess={handleCreateButtonClick}
        successText="작성 완료"
        cancelText="취소"
        hasCancelWarning
        cancelWarningText="작성한 내용이 모두 사라집니다?"
      />
    </div>
  );
};

export default MecaWriteForm;
