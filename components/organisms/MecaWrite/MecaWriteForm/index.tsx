import { RefObject, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import InputGroup from '@/components/molcules/InputGroup';
import useInput from '@/hooks/useInput';
import { MecaTagType, MecaType } from '@/types/domain';
import useIncrease from '@/hooks/useCount';
import NumberIncreaseToggle from '@/components/atoms/NumberIncreaseToggle';

import OxQuestion from './question/OxQuestion';
import { MecaWriteInputComponentType } from './type';
import SelectQuestion from './question/SelectQuestion';
import KeywordQuestion from './question/KeywordQuestion';

const QUESTION_COMPONENTS: Record<MecaTagType, MecaWriteInputComponentType> = {
  ox: OxQuestion,
  desc: OxQuestion,
  keyword: KeywordQuestion,
  select: SelectQuestion,
};

export interface MecaWriteFormProps extends Partial<MecaType> {
  titleRef: RefObject<HTMLDivElement>;
  categoryId: string;
  mecaTagType: MecaTagType;
}

const MecaWriteForm = ({ mecaTagType, titleRef, cardId, categoryId, title, answer, question }: MecaWriteFormProps) => {
  const { input: titleInput, onInputChange: onTitleChange } = useInput(title ?? '');
  const { input: questionInput, onInputChange: onQuestionChange } = useInput(question ?? '');
  const { number: caseNum, increaseNumber: changeCaseNum } = useIncrease(
    question && mecaTagType === 'select' ? JSON.parse(question).length : 3,
    3,
    5,
  );
  const [Question, setQuestion] = useState<MecaWriteInputComponentType | undefined>(undefined);
  useLayoutEffect(() => {
    setQuestion(() => QUESTION_COMPONENTS[mecaTagType]);
  }, [mecaTagType]);

  if (!titleRef.current) {
    return null;
  }
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
      {mecaTagType === 'select' && (
        <InputGroup>
          <InputGroup.Label>문항 수를 선택하세요</InputGroup.Label>
          <NumberIncreaseToggle value={caseNum} onChange={changeCaseNum} />
        </InputGroup>
      )}
    </div>
  );
};

export default MecaWriteForm;
