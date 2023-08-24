import dynamic from 'next/dynamic';

import { useEffect, useMemo } from 'react';

import type { User } from '@/types/domain/user';

import Avatar from '@/components/@common/atoms/Avatar';
import LinkButton from '@/components/@common/atoms/LinkButton';
import useImage from '@/hooks/useImage';
import useModal from '@/hooks/useModal';

import { UserAvatarEditorWrapper } from './styled';

const ImageCropper = dynamic(() => import('@/components/@common/molecules/ImageCropper'));

interface UserAvatarEditorProps extends Omit<User, 'name'> {
  updateProfileImage: (image: string | File | undefined) => void;
  deleteProfileImage: () => void;
}

const UserAvatarEditor = ({ memberId, profile, updateProfileImage, deleteProfileImage }: UserAvatarEditorProps) => {
  const { image, onUploadLocalImage, onDelete: onDeleteImage, onSetFileImage } = useImage(profile);
  const { visible: isImageCropperVisible, open: openImageCropper, close: closeImageCropper } = useModal();
  const urlImage = useMemo(() => {
    if (!image || typeof image === 'string') {
      return image ?? '';
    }
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    updateProfileImage(image);
  }, [image, updateProfileImage]);

  const handleProfileImageDelete = () => {
    if (!profile) {
      return;
    }
    deleteProfileImage();
    onDeleteImage();
  };

  return (
    <UserAvatarEditorWrapper>
      <Avatar imgSrc={urlImage} imgName={memberId} imgSize={120} priority />
      <div>
        <LinkButton onClick={onUploadLocalImage}>등록</LinkButton>
        {profile && <LinkButton onClick={handleProfileImageDelete}>제거</LinkButton>}
        {profile && <LinkButton onClick={openImageCropper}>편집</LinkButton>}
      </div>
      {isImageCropperVisible && image && (
        <ImageCropper
          isCropBoxRatioChangeable={false}
          onClose={closeImageCropper}
          image={urlImage}
          setImage={onSetFileImage}
          minCropBoxWidth={36}
          minCropBoxHeight={36}
          roundness="100%"
        />
      )}
    </UserAvatarEditorWrapper>
  );
};

export default UserAvatarEditor;
