import { RefObject, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import NumberIncreaseToggle from '@/components/atoms/NumberIncreaseToggle';
import ButtonGroup from '@/components/molcules/ButtonGroup';
import Editor from '@/components/molcules/Editor';
import InputGroup from '@/components/molcules/InputGroup';
import useMecaWrite from '@/hooks/meca/useMecaWrite';
import useIncrease from '@/hooks/useCount';
import useInput from '@/hooks/useInput';
import { MECA_TAG_TO_RESPONSE, MecaTagType, MecaType } from '@/types/domain';

import KeywordAnswer from './answer/KeywordAnswer';
import OxAnswer from './answer/OxAnswer';
import SelectAnswer from './answer/SelectAnswer';
import KeywordQuestion from './question/KeywordQuestion';
import OxQuestion from './question/OxQuestion';
import SelectQuestion from './question/SelectQuestion';
import { MecaWriteInputComponentType } from './type';

const QUESTION_COMPONENTS: Record<MecaTagType, MecaWriteInputComponentType> = {
  ox: OxQuestion,
  desc: OxQuestion,
  keyword: KeywordQuestion,
  select: SelectQuestion,
};

const ANSWER_COMPONENTS: Record<MecaTagType, MecaWriteInputComponentType> = {
  ox: OxAnswer,
  desc: OxAnswer,
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
  const {
    input: questionInput,
    onInputChange: onQuestionChange,
    setInput: setQuestionInput,
  } = useInput(question ?? '');
  const { input: answerInput, onInputChange: onAnswerChange, setInput: setAnswerInput } = useInput(answer ?? '');
  const { number: caseNum, increaseNumber: changeCaseNum } = useIncrease(
    question && mecaTagType === 'select' ? JSON.parse(question).length - 1 : 3,
    3,
    5,
  );
  const [Question, setQuestion] = useState<MecaWriteInputComponentType | undefined>(undefined);
  const [Answer, setAnswer] = useState<MecaWriteInputComponentType | undefined>(undefined);

  useEffect(() => {
    setQuestion(() => QUESTION_COMPONENTS[mecaTagType]);
    setAnswer(() => ANSWER_COMPONENTS[mecaTagType]);

    return () => {
      setQuestionInput(question ?? '');
      setAnswerInput(answer ?? '');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mecaTagType]);

  if (!titleRef.current) {
    return null;
  }

  const handleCreateButtonClick = () => {
    // TODO: validation 로직 추가
    const body = {
      title: titleInput,
      categoryId,
      question: questionInput,
      description: descInput,
    };
    cardId
      ? updateMeca({ ...body, cardId })
      : createMeca({ ...body, answer: answerInput, cardType: MECA_TAG_TO_RESPONSE[mecaTagType] });
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
            isValid
            ariaLabel="input-meca-title"
          />
        </InputGroup>,
        titleRef.current,
      )}
      {Question && <Question value={questionInput} onChange={onQuestionChange} selectionNum={caseNum} />}
      {!cardId && mecaTagType === 'select' && (
        <InputGroup>
          <InputGroup.Label>문항 수를 선택하세요</InputGroup.Label>
          <NumberIncreaseToggle value={caseNum} onChange={changeCaseNum} />
        </InputGroup>
      )}
      {Answer && <Answer value={answerInput} onChange={onAnswerChange} selectionNum={caseNum} isDisabled={!!cardId} />}
      <br />
      <InputGroup>
        <InputGroup.Label>문제를 설명하세요</InputGroup.Label>
        <Editor.Writer contents={descInput} setContents={setDescInput} />
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
