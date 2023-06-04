import Image from 'next/image';

import { useCallback, useRef, useState } from 'react';

import Cropper, { ReactCropperElement } from 'react-cropper';
import { createPortal } from 'react-dom';

import Button from '@/components/atoms/Button';
import alertToast from '@/utils/toastHandler';

import { CropPreviewContainer, CropSideContainer, ImageCropperWrapper } from './styled';

export interface ImageCropperProps {
  image: string;
  setImage: (image: File) => void;
  isCropBoxRatioChangeable: boolean;
  minCropBoxWidth?: number;
  minCropBoxHeight?: number;
  onClose: () => void;
}

const ImageCropper = ({
  onClose,
  image,
  setImage,
  isCropBoxRatioChangeable,
  minCropBoxWidth = 20,
  minCropBoxHeight = 20,
}: ImageCropperProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [cropData, setCropData] = useState<File>();
  const [cropWidth, setCropWidth] = useState<number>(0);
  const [cropHeight, setCropHeight] = useState<number>(0);
  const [isPreviewState, setIsPreviewState] = useState<boolean>(false);

  const handleCrop = useCallback(() => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      const width = document.querySelector<HTMLElement>('.cropper-face')?.offsetWidth ?? croppedCanvas.width / 2;
      const height = document.querySelector<HTMLElement>('.cropper-face')?.offsetHeight ?? croppedCanvas.height / 2;
      croppedCanvas.toBlob((blob) => {
        if (!blob) {
          return;
        }
        const croppedImage = new File([blob], `cropped.${blob.type.replace('image/', '')}`, { type: blob.type });
        setCropData(croppedImage);
        setCropWidth(width);
        setCropHeight(height);
      });
    }
  }, []);

  const handleConfirm = () => {
    if (!cropData) {
      alertToast('이미지 리사이징을 먼저 해주세요!', 'info');
      return;
    }
    setImage(cropData);
    onClose();
  };

  const portalDiv = document.querySelector('#image-crop-root') ?? document.body;
  if (!portalDiv) {
    return null;
  }
  return (
    <>
      {createPortal(
        <ImageCropperWrapper>
          <div>
            <CropSideContainer>
              <div>&nbsp;</div>
              {!isPreviewState ? (
                <Button
                  colorTheme="cancel"
                  onClick={() => {
                    handleCrop();
                    setIsPreviewState((prev) => !prev);
                  }}
                >
                  자르기
                </Button>
              ) : (
                <div>
                  <Button colorTheme="cancel" onClick={() => setIsPreviewState((prev) => !prev)}>
                    뒤로
                  </Button>
                  <Button colorTheme="primary" onClick={handleConfirm}>
                    확인
                  </Button>
                </div>
              )}
            </CropSideContainer>
            <Cropper
              ref={cropperRef}
              src={image}
              style={{ opacity: isPreviewState ? '0' : '1' }}
              zoomTo={0.5}
              viewMode={1}
              initialAspectRatio={minCropBoxWidth / minCropBoxHeight}
              aspectRatio={isCropBoxRatioChangeable ? NaN : minCropBoxWidth / minCropBoxHeight}
              minCropBoxHeight={minCropBoxHeight}
              minCropBoxWidth={minCropBoxWidth}
              dragMode={isCropBoxRatioChangeable ? 'crop' : 'move'}
              checkOrientation={false}
              guides
              background={false}
              responsive
            />
            {isPreviewState && (
              <CropPreviewContainer>
                {cropData && (
                  <Image alt="preview" src={URL.createObjectURL(cropData)} width={cropWidth} height={cropHeight} />
                )}
              </CropPreviewContainer>
            )}
            <CropSideContainer>
              <div>&nbsp;</div>
              <div>
                <Button colorTheme="cancel" onClick={onClose}>
                  나가기
                </Button>
              </div>
            </CropSideContainer>
          </div>
        </ImageCropperWrapper>,
        portalDiv,
      )}
    </>
  );
};
export default ImageCropper;
