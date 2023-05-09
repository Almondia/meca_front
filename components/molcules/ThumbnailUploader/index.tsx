/* eslint-disable jsx-a11y/label-has-associated-control */
import dynamic from 'next/dynamic';

import { memo, useEffect, useRef, useState } from 'react';

import Icon from '@/components/common/Icon';
import useModal from '@/hooks/useModal';
import { IMAGE_SERVER } from '@/utils/constants';

import {
  ThumbnailChangeBox,
  ThumbnailChangeLink,
  ThumbnailHiddenInputBox,
  ThumbnailImageContainer,
  ThumbnailUploadButton,
  ThumbnailUploaderWrapper,
} from './styled';

const ImageCropper = dynamic(() => import('../ImageCropper'));

export interface ThumbnailUploaderProps {
  image?: string | File;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

const ThumbnailUploader = ({ image, onChange, onDelete }: ThumbnailUploaderProps) => {
  const [currentImage, setCurrentImage] = useState<string | File | undefined>();
  const { visible: isCropperVisible, close: onCloseCropper, open: onOpenCropper } = useModal();
  const hiddenImageRef = useRef<HTMLInputElement>(null);
  const handleUploadThumbnailClick = () => {
    hiddenImageRef.current?.click();
  };

  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  // TODO: 이미지 업로드 시 자동으로 사이즈 조절 UI 식별 - 회의 후 동의 못받으면 제거
  useEffect(() => {
    if (hiddenImageRef.current?.value && !hiddenImageRef.current.value.endsWith('.gif')) {
      onOpenCropper();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiddenImageRef.current?.value]);

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
            <ThumbnailChangeLink onClick={onOpenCropper}>리사이징</ThumbnailChangeLink>
            <ThumbnailChangeLink onClick={handleUploadThumbnailClick}>재업로드</ThumbnailChangeLink>
            <ThumbnailChangeLink onClick={onDelete}>제거</ThumbnailChangeLink>
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
        <ThumbnailHiddenInputBox>
          <label>
            upload-thumbnail
            <input
              ref={hiddenImageRef}
              type="file"
              name="file-upload"
              accept="image/jpeg, image/jpg image/png image/gif"
              aria-label="input-thumbnail-image"
              onChange={onChange}
            />
          </label>
        </ThumbnailHiddenInputBox>
        {currentImage ? (
          <ThumbnailImageContainer
            data-testid="id-thumbnail-background"
            image={
              typeof currentImage === 'string' ? `${IMAGE_SERVER}/${currentImage}` : URL.createObjectURL(currentImage)
            }
          />
        ) : (
          <ThumbnailUploadButton onClick={handleUploadThumbnailClick}>
            <Icon size="30px" icon="Logo" color="var(--color-gray)" />
            썸네일 업로드
          </ThumbnailUploadButton>
        )}
      </ThumbnailUploaderWrapper>
    </>
  );
};

export default memo(ThumbnailUploader);
