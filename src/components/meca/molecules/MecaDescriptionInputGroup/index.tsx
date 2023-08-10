import React from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import { useMecaDescriptionContext } from '@/components/meca/molecules/MecaWriteContextProvider';

const MecaDescriptionInputGroup = ({
  DescriptionEditor,
}: {
  DescriptionEditor: React.ComponentType<{
    contents: string;
    setContents: React.Dispatch<React.SetStateAction<string>>;
  }>;
}) => {
  const { input: description, setInput: setDescription } = useMecaDescriptionContext();
  return (
    <InputGroup>
      <InputGroup.Label>문제를 설명하세요</InputGroup.Label>
      <DescriptionEditor contents={description} setContents={setDescription} />
    </InputGroup>
  );
};

export default MecaDescriptionInputGroup;
