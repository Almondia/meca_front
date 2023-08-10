import { useState } from 'react';

import LinkButton from '@/components/@common/atoms/LinkButton';
import InputGroup from '@/components/@common/molecules/InputGroup';
import useInput from '@/hooks/useInput';
import useInputValidation from '@/hooks/useInputValidation';
import { Constraints } from '@/utils/validation';

import { UserNameEditorWrapper, UserProfileName, UserProfileNameChangeBox } from './styled';

interface UserNameEditorProps {
  name: string;
  updateProfileName: (val: string) => void;
}

const UserNameEditor = ({ name, updateProfileName }: UserNameEditorProps) => {
  const [isNameChangeClicked, setIsNameChangeClicked] = useState(false);
  const { input: nameInput, onInputChange: nameInputChange } = useInput(name);
  const { inputsValidState, validateAll, resetValidateState } = useInputValidation(1);

  const handleProfileNameChange = () => {
    if (!isNameChangeClicked) {
      setIsNameChangeClicked(true);
      return;
    }
    const { hasInvalid } = validateAll([() => Constraints.username(nameInput)]);
    if (hasInvalid) {
      return;
    }
    name !== nameInput && updateProfileName(nameInput);
    resetValidateState();
    setIsNameChangeClicked(false);
  };
  return (
    <UserNameEditorWrapper>
      {!isNameChangeClicked ? (
        <UserProfileName>{name}</UserProfileName>
      ) : (
        <UserProfileNameChangeBox>
          <InputGroup>
            <InputGroup.Input.Title
              name="input-name"
              ariaLabel="id-input-name"
              value={nameInput}
              onChange={nameInputChange}
              placeholder={name}
              isValid={inputsValidState[0].isValid}
            />
            <InputGroup.Validation visible={!inputsValidState[0].isValid}>
              {inputsValidState[0].message}
            </InputGroup.Validation>
          </InputGroup>
        </UserProfileNameChangeBox>
      )}
      <LinkButton textSize="main" onClick={handleProfileNameChange}>
        {isNameChangeClicked ? '저장하기' : '변경하기'}
      </LinkButton>
      &nbsp;&nbsp;
      {isNameChangeClicked && (
        <LinkButton textSize="main" onClick={() => setIsNameChangeClicked(false)}>
          취소하기
        </LinkButton>
      )}
    </UserNameEditorWrapper>
  );
};

export default UserNameEditor;
