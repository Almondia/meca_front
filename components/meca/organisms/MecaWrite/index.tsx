import { useCallback, useEffect, useState } from 'react';

import QuillWriter from '@/components/@common/organisms/Editor/QuillWriter';
import MecaAnswerInputGroup from '@/components/meca/molecules/MecaAnswerInputGroup';
import MecaDescriptionInputGroup from '@/components/meca/molecules/MecaDescriptionInputGroup';
import MecaQuestionInputGroup from '@/components/meca/molecules/MecaQuestionInputGroup';
import MecaTagToggleGroup from '@/components/meca/molecules/MecaTagToggleGroup';
import MecaTitleInputGroup from '@/components/meca/molecules/MecaTitleInputGroup';
import MecaUploadButtonGroup from '@/components/meca/molecules/MecaUploadButtonGroup';
import { MecaWriteContextProvider } from '@/components/meca/molecules/MecaWriteContextProvider';
import { MecaTagType, MecaType } from '@/types/domain';
import { MECA_TAGS } from '@/utils/constants';

import { MecaWriteWrapper } from './styled';

const MECA_TAG_KEYS = Object.keys(MECA_TAGS) as (keyof typeof MECA_TAGS)[];

export interface MecaWriteProps extends Partial<MecaType> {
  categoryId: string;
}

const MecaWrite = ({ cardId, categoryId, title, cardType, answer, question, description }: MecaWriteProps) => {
  const [selectedMecaTag, setSelectedMecaTag] = useState<MecaTagType>(cardType ?? 'OX_QUIZ');
  const [QuestionInputGroup, setQuestionInputGroup] = useState(() => MecaQuestionInputGroup[selectedMecaTag]);
  const [AnswerInputGroup, setAnswerInputGroup] = useState(() => MecaAnswerInputGroup[selectedMecaTag]);

  useEffect(() => {
    setQuestionInputGroup(() => MecaQuestionInputGroup[selectedMecaTag]);
    setAnswerInputGroup(() => MecaAnswerInputGroup[selectedMecaTag]);
  }, [selectedMecaTag]);

  const handleMecaTagToggle = useCallback((tag: MecaTagType) => {
    setSelectedMecaTag(tag);
  }, []);
  return (
    <MecaWriteWrapper>
      <MecaWriteContextProvider
        meca={{ cardId, categoryId, title, question, answer, cardType: selectedMecaTag, description }}
      >
        <MecaTitleInputGroup />
        <MecaTagToggleGroup
          options={MECA_TAG_KEYS}
          selected={selectedMecaTag}
          onToggle={handleMecaTagToggle}
          onlySelected={!!cardId}
        />
        <QuestionInputGroup QuestionEditor={QuillWriter} minHeight="150px" maxHeight="780px" />
        <AnswerInputGroup />
        <MecaDescriptionInputGroup DescriptionEditor={QuillWriter} />
        <br />
        <br />
        <MecaUploadButtonGroup />
      </MecaWriteContextProvider>
    </MecaWriteWrapper>
  );
};

export default MecaWrite;
