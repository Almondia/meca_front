/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';

import Avatar from '@/components/atoms/Avatar';
import Input from '@/components/atoms/Input';
import LinkButton from '@/components/atoms/LinkButton';
import InputGroup from '@/components/molcules/InputGroup';
import useFetchImage from '@/hooks/useFetchImage';
import useImage from '@/hooks/useImage';
import useInput from '@/hooks/useInput';
import useProfileUpdate from '@/hooks/user/useProfileUpdate';
import { UserProfile as UserProfileType } from '@/types/domain';
import { getRemoteImageUrl } from '@/utils/imageHandler';

import {
  UserProfileAvatarContainer,
  UserProfileInfoContainer,
  UserProfileName,
  UserProfileNameChangeBox,
  UserProfileWrapper,
} from './styled';

// TODO: 본인 외 사용자 조회가 있다면 리팩터링
export interface UserProfileProps extends UserProfileType {
  isMe?: boolean;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const UserProfileHeader = ({ memberId, name, profile, isMe }: UserProfileProps) => {
  const [isNameChangeClicked, setIsNameChangeClicked] = useState(false);
  const { updateProfile } = useProfileUpdate();
  const { image, onUploadLocalImage, onDelete: onDeleteImage } = useImage(profile);
  const { uploadImage } = useFetchImage();
  const { input: nameInput, onInputChange: nameInputChange } = useInput(name);

  useEffect(() => {
    if (!image || typeof image === 'string') {
      return;
    }
    (async () => {
      const newProfile = await uploadImage({ purpose: 'profile', extension: 'png', fileName: memberId }, image);
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
    if (nameInput.length > 20) {
      return;
    }
    updateProfile({ name: nameInput || name });
    setIsNameChangeClicked(false);
  };

  return (
    <UserProfileWrapper>
      <UserProfileAvatarContainer>
        <Avatar imgSrc={profile} imgName={memberId} imgSize={120} />
        <div>
          <LinkButton onClick={onUploadLocalImage}>업로드</LinkButton>
          <LinkButton onClick={handleProfileImageDelete}>제거하기</LinkButton>
        </div>
      </UserProfileAvatarContainer>
      <UserProfileInfoContainer>
        {!isNameChangeClicked ? (
          <UserProfileName>{name}</UserProfileName>
        ) : (
          <UserProfileNameChangeBox>
            <InputGroup>
              <Input.Title
                name="input-name"
                ariaLabel="id-input-name"
                value={nameInput}
                onChange={nameInputChange}
                placeholder={name}
                isValid={nameInput.length <= 20}
              />
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
