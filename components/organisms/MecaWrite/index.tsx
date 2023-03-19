import { useRef, useState } from 'react';

import MecaTagToggleGroup from '@/components/molcules/MecaTagToggleGroup';
import { MECA_RESPONE_TO_TAG, MecaTagType, MecaType } from '@/types/domain';
import { Devide } from '@/styles/layout';
import InputGroup from '@/components/molcules/InputGroup';

import { MecaWriteWrapper } from './styled';
import MecaWriteForm from './MecaWriteForm';

const MECA_TAGS = Object.values(MECA_RESPONE_TO_TAG);

export interface MecaWriteProps extends Partial<MecaType> {
  categoryId: string;
}

const MecaWrite = ({ cardId, title, cardType, answer, categoryId, question }: MecaWriteProps) => {
  const [selectedMecaTag, setSelectedMecaTag] = useState<MecaTagType>(MECA_RESPONE_TO_TAG[cardType ?? 'OX_QUIZ']);
  const titleRef = useRef<HTMLDivElement>(null);
  const handleMecaTagToggle = (tag: MecaTagType) => {
    setSelectedMecaTag(tag);
  };
  return (
    <MecaWriteWrapper>
      <div ref={titleRef} />
      <InputGroup>
        <InputGroup.Label>문제 유형 한가지를 선택하세요</InputGroup.Label>
        <br />
        <MecaTagToggleGroup
          options={MECA_TAGS}
          selected={selectedMecaTag}
          onToggle={handleMecaTagToggle}
          onlySelected={!!cardId}
        />
        <Devide />
      </InputGroup>
      <MecaWriteForm
        mecaTagType={selectedMecaTag}
        titleRef={titleRef}
        title={title}
        answer={answer}
        categoryId={categoryId}
        question={question}
        cardId={cardId}
      />
    </MecaWriteWrapper>
  );
};

export default MecaWrite;
