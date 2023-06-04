/* eslint-disable jsx-a11y/label-has-associated-control */
import dynamic from 'next/dynamic';

import { memo, useCallback, useEffect, useState } from 'react';

import LinkButton from '@/components/atoms/LinkButton';
import Icon from '@/components/common/Icon';
import useModal from '@/hooks/useModal';
import { getRemoteImageUrl } from '@/utils/imageHandler';

import { ThumbnailChangeBox, ThumbnailImageContainer, ThumbnailUploadButton, ThumbnailUploaderWrapper } from './styled';

const ImageCropper = dynamic(() => import('../ImageCropper'));

export interface ThumbnailUploaderProps {
  image?: string | File;
  onSetImage: (image: File) => void;
  onDelete: () => void;
  onUpload: () => void;
}

const ThumbnailUploader = ({ image, onSetImage, onDelete, onUpload }: ThumbnailUploaderProps) => {
  const [currentImage, setCurrentImage] = useState<string | File | undefined>();
  const { visible: isCropperVisible, close: onCloseCropper, open: onOpenCropper } = useModal();

  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  const genVisibleImageUrl = useCallback(
    (urlOrFileImage: File | string) =>
      typeof urlOrFileImage === 'string' ? getRemoteImageUrl(urlOrFileImage) : URL.createObjectURL(urlOrFileImage),
    [],
  );

  return (
    <>
      {currentImage && (
        <>
          <ThumbnailChangeBox>
            <LinkButton onClick={onOpenCropper}>편집</LinkButton>
            <LinkButton onClick={onUpload}>재업로드</LinkButton>
            <LinkButton onClick={onDelete}>제거</LinkButton>
          </ThumbnailChangeBox>
          {isCropperVisible && (
            <ImageCropper
              image={genVisibleImageUrl(currentImage)}
              setImage={onSetImage}
              isCropBoxRatioChangeable={false}
              minCropBoxHeight={75}
              minCropBoxWidth={150}
              onClose={onCloseCropper}
            />
          )}
        </>
      )}
      <ThumbnailUploaderWrapper>
        {currentImage ? (
          <ThumbnailImageContainer data-testid="id-thumbnail-background" image={genVisibleImageUrl(currentImage)} />
        ) : (
          <ThumbnailUploadButton onClick={onUpload}>
            <Icon size="30px" icon="Logo" color="var(--color-gray)" />
            썸네일 업로드
          </ThumbnailUploadButton>
        )}
      </ThumbnailUploaderWrapper>
    </>
  );
};

export default memo(ThumbnailUploader);
