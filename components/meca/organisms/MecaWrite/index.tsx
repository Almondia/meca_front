import { useRef, useState } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import MecaTagToggleGroup from '@/components/meca/molecules/MecaTagToggleGroup';
import { MecaTagType, MecaType } from '@/types/domain';
import { MECA_TAGS } from '@/utils/constants';

import MecaWriteForm from './MecaWriteForm';
import { MecaWriteWrapper } from './styled';

const MECA_TAG_KEYS = Object.keys(MECA_TAGS) as (keyof typeof MECA_TAGS)[];

export interface MecaWriteProps extends Partial<MecaType> {
  categoryId: string;
}

const MecaWrite = ({ cardId, title, cardType, answer, categoryId, question, description }: MecaWriteProps) => {
  const [selectedMecaTag, setSelectedMecaTag] = useState<MecaTagType>(cardType ?? 'OX_QUIZ');
  const titleRef = useRef<HTMLDivElement>(null);
  const handleMecaTagToggle = (tag: MecaTagType) => {
    setSelectedMecaTag(tag);
  };
  return (
    <MecaWriteWrapper>
      <div ref={titleRef} />
      <InputGroup>
        <InputGroup.Label>{cardId ? '문제 유형' : '문제 유형 한가지를 선택하세요'}</InputGroup.Label>
        <MecaTagToggleGroup
          options={MECA_TAG_KEYS}
          selected={selectedMecaTag}
          onToggle={handleMecaTagToggle}
          onlySelected={!!cardId}
        />
      </InputGroup>
      <MecaWriteForm
        mecaTagType={selectedMecaTag}
        titleRef={titleRef}
        title={title}
        answer={answer}
        categoryId={categoryId}
        question={question}
        cardId={cardId}
        description={description}
      />
    </MecaWriteWrapper>
  );
};

export default MecaWrite;
