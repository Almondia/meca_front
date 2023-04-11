/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef } from 'react';

import Icon from '@/components/atoms/Icon';
import { IMAGE_SERVER } from '@/utils/constants';

import {
  ThumbnailChangeBox,
  ThumbnailChangeLink,
  ThumbnailHiddenInputBox,
  ThumbnailImageContainer,
  ThumbnailUploadButton,
  ThumbnailUploaderWrapper,
} from './styled';

export interface ThumbnailUploaderProps {
  image?: string | File;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

const ThumbnailUploader = ({ image, onChange, onDelete }: ThumbnailUploaderProps) => {
  const hiddenImageRef = useRef<HTMLInputElement>(null);
  const handleUploadThumbnailClick = () => {
    hiddenImageRef.current?.click();
  };

  return (
    <>
      {image && (
        <ThumbnailChangeBox>
          <ThumbnailChangeLink onClick={handleUploadThumbnailClick}>재업로드</ThumbnailChangeLink>
          <ThumbnailChangeLink onClick={onDelete}>제거</ThumbnailChangeLink>
        </ThumbnailChangeBox>
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
        {image ? (
          <ThumbnailImageContainer
            data-testid="id-thumbnail-background"
            image={typeof image === 'string' ? `${IMAGE_SERVER}/${image}` : URL.createObjectURL(image)}
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

export default ThumbnailUploader;
