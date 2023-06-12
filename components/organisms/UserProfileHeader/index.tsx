/* eslint-disable react/button-has-type */
import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';

import Avatar from '@/components/atoms/Avatar';
import LinkButton from '@/components/atoms/LinkButton';
import InputGroup from '@/components/molcules/InputGroup';
import useFetchImage from '@/hooks/useFetchImage';
import useImage from '@/hooks/useImage';
import useInput from '@/hooks/useInput';
import useInputValidation from '@/hooks/useInputValidation';
import useModal from '@/hooks/useModal';
import useProfileUpdate from '@/hooks/user/useProfileUpdate';
import { UserProfile as UserProfileType } from '@/types/domain';
import { getRemoteImageUrl } from '@/utils/imageHandler';
import { Constraints } from '@/utils/validation';

import {
  UserProfileAvatarContainer,
  UserProfileInfoContainer,
  UserProfileName,
  UserProfileNameChangeBox,
  UserProfileWrapper,
} from './styled';

const ImageCropper = dynamic(() => import('@/components/molcules/ImageCropper'));

// TODO: 본인 외 사용자 조회가 있다면 리팩터링
export interface UserProfileProps extends UserProfileType {
  isMe?: boolean;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const UserProfileHeader = ({ memberId, name, profile, isMe }: UserProfileProps) => {
  const [isNameChangeClicked, setIsNameChangeClicked] = useState(false);
  const { updateProfile } = useProfileUpdate();
  const { image, onUploadLocalImage, onDelete: onDeleteImage, onSetFileImage } = useImage(profile);
  const { uploadImage } = useFetchImage();
  const { input: nameInput, onInputChange: nameInputChange } = useInput(name);
  const { visible: isImageCropperVisible, open: openImageCropper, close: closeImageCropper } = useModal();
  const { inputsValidState, validateAll, resetValidateState } = useInputValidation(1);

  useEffect(() => {
    if (!image || typeof image === 'string') {
      return;
    }
    (async () => {
      const newProfile = await uploadImage(
        { purpose: 'profile', extension: 'png', fileName: Date.now().toString() },
        image,
      );
      newProfile && updateProfile({ profile: getRemoteImageUrl(newProfile) });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleProfileImageDelete = () => {
    if (!profile) {
      return;
    }
    updateProfile({ profile: '' });
    onDeleteImage();
  };

  const handleProfileNameChange = () => {
    if (!isNameChangeClicked) {
      setIsNameChangeClicked(true);
      return;
    }
    const { hasInvalid } = validateAll([() => Constraints.username(nameInput)]);
    if (hasInvalid) {
      return;
    }
    name !== nameInput && updateProfile({ name: nameInput });
    resetValidateState();
    setIsNameChangeClicked(false);
  };

  return (
    <UserProfileWrapper>
      <UserProfileAvatarContainer>
        <Avatar imgSrc={profile} imgName={memberId} imgSize={120} />
        <div>
          <LinkButton onClick={onUploadLocalImage}>등록</LinkButton>
          {profile && <LinkButton onClick={handleProfileImageDelete}>제거</LinkButton>}
          {profile && <LinkButton onClick={openImageCropper}>편집</LinkButton>}
        </div>
        {isImageCropperVisible && image && (
          <ImageCropper
            isCropBoxRatioChangeable={false}
            onClose={closeImageCropper}
            image={typeof image === 'string' ? image : URL.createObjectURL(image)}
            setImage={onSetFileImage}
            minCropBoxWidth={36}
            minCropBoxHeight={36}
            roundness="100%"
          />
        )}
      </UserProfileAvatarContainer>
      <UserProfileInfoContainer>
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
      </UserProfileInfoContainer>
    </UserProfileWrapper>
  );
};

export default UserProfileHeader;
