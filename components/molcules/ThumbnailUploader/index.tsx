/* eslint-disable jsx-a11y/label-has-associated-control */
import dynamic from 'next/dynamic';

import { memo, useEffect, useState } from 'react';

import LinkButton from '@/components/atoms/LinkButton';
import Icon from '@/components/common/Icon';
import useModal from '@/hooks/useModal';
import { IMAGE_SERVER } from '@/utils/constants';

import { ThumbnailChangeBox, ThumbnailImageContainer, ThumbnailUploadButton, ThumbnailUploaderWrapper } from './styled';

const ImageCropper = dynamic(() => import('../ImageCropper'));

export interface ThumbnailUploaderProps {
  image?: string | File;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onUpload: () => void;
}

const ThumbnailUploader = ({ image, onChange, onDelete, onUpload }: ThumbnailUploaderProps) => {
  const [currentImage, setCurrentImage] = useState<string | File | undefined>();
  const { visible: isCropperVisible, close: onCloseCropper, open: onOpenCropper } = useModal();

  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  const setImage = (newImage: File) => {
    setCurrentImage(newImage);
    const event = new CustomEvent<HTMLInputElement>('change') as unknown as React.ChangeEvent<HTMLInputElement>;
    Object.defineProperty(event, 'target', {
      value: {
        files: [newImage],
      },
    });
    onChange(event);
  };

  return (
    <>
      {currentImage && (
        <>
          <ThumbnailChangeBox>
            <LinkButton onClick={onOpenCropper}>리사이징</LinkButton>
            <LinkButton onClick={onUpload}>재업로드</LinkButton>
            <LinkButton onClick={onDelete}>제거</LinkButton>
          </ThumbnailChangeBox>
          {isCropperVisible && (
            <ImageCropper
              image={
                typeof currentImage === 'string' ? `${IMAGE_SERVER}/${currentImage}` : URL.createObjectURL(currentImage)
              }
              setImage={setImage}
              isCropBoxResizable={false}
              minCropBoxHeight={150}
              minCropBoxWidth={300}
              onClose={onCloseCropper}
            />
          )}
        </>
      )}
      <ThumbnailUploaderWrapper>
        {currentImage ? (
          <ThumbnailImageContainer
            data-testid="id-thumbnail-background"
            image={
              typeof currentImage === 'string' ? `${IMAGE_SERVER}/${currentImage}` : URL.createObjectURL(currentImage)
            }
          />
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
