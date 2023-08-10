import { memo } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import { useMecaTitleContext } from '@/components/meca/molecules/MecaWriteContextProvider';

const MecaTitleInputGroup = memo(() => {
  const { input: title, onInputChange, isValid, message } = useMecaTitleContext();
  return (
    <InputGroup>
      <InputGroup.Input.Title
        value={title}
        onChange={onInputChange}
        placeholder="제목 추가"
        name="meca-title"
        isValid={isValid}
        ariaLabel="input-meca-title"
      />
      <InputGroup.Validation visible={!isValid}>{message}</InputGroup.Validation>
    </InputGroup>
  );
});

export default MecaTitleInputGroup;
