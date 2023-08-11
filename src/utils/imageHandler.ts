import type { ImageUploadRequest } from '@/types/domain';

import { IMAGE_EXTENTIONS } from '@/utils/constants';

const REMOTE_IMAGE_URL = process.env.NEXT_PUBLIC_REMOTE_IMAGE_URL ?? '';

export const extractAllImageFromHTML = (htmlString: string, remoteUrl?: string): string[] | undefined => {
  const regex = new RegExp(
    `<img\\s+[^>]*src\\s*=\\s*['"](?=.*${remoteUrl ?? REMOTE_IMAGE_URL})([^'"]*)['"][^>]*>`,
    'gi',
  );
  const matchedLength = htmlString.match(regex)?.length ?? 0;
  if (matchedLength === 0) {
    return undefined;
  }
  return [...Array(matchedLength)].reduce((prev) => {
    const result = regex.exec(htmlString);
    return result ? prev.concat(result[1]) : prev;
  }, []);
};

/**
 * default width,height: 360
 */
export const extractFirstImageFromHTML = (htmlString: string, remoteUrl?: string) => {
  const regex = new RegExp(
    `<img\\s+[^>]*src\\s*=\\s*['"](?=.*${remoteUrl ?? REMOTE_IMAGE_URL})([^'"]*)['"][^>]*>`,
    'gi',
  );
  const match = regex.exec(htmlString);
  if (!match) {
    return undefined;
  }
  const imgTag = match[0];
  const srcMatch = imgTag.match(/src=['"]([^'"]*)['"]/i);
  const widthMatch = imgTag.match(/width=['"]([^'"]*)['"]/i);
  const heightMatch = imgTag.match(/height=['"]([^'"]*)['"]/i);

  const src = srcMatch?.[1] || '';
  const width = parseInt(widthMatch?.[1] ?? '', 10) || 360;
  const height = parseInt(heightMatch?.[1] ?? '', 10) || 360;
  return { src, width, height };
};

export const getRemoteImageUrl = (imageSrc: string) =>
  REMOTE_IMAGE_URL ? `${REMOTE_IMAGE_URL}/${imageSrc}` : imageSrc;

export const getOriginImageSize = (image: File | string): Promise<{ width: number; height: number }> => {
  const url = typeof image === 'string' ? image : URL.createObjectURL(image);
  return new Promise((resolve) => {
    const imageElement = document.createElement('img');
    imageElement.src = url;
    imageElement.onload = () => {
      resolve({ width: imageElement.naturalWidth, height: imageElement.naturalHeight });
    };
  });
};

export const validImageFile = (uploadImage?: File) => {
  if (!uploadImage || uploadImage.type.indexOf('image/') === -1) {
    return { valid: false, message: '올바른 이미지 파일을 등록하세요' };
  }
  if (!IMAGE_EXTENTIONS.includes(uploadImage.type.replace('image/', '') as (typeof IMAGE_EXTENTIONS)[number])) {
    return { valid: false, message: 'jpg/jpeg/png/webp/gif 확장자만 업로드 가능합니다.' };
  }
  if (uploadImage.name.split('.').length !== 2) {
    return { valid: false, message: '경로를 제외한 이미지 파일 이름에 "." 이 포함되어있습니다.' };
  }
  return { valid: true, message: '' };
};

export const getImageInfo = (uploadedImage: File): Omit<ImageUploadRequest, 'purpose'> => {
  const fileName = uploadedImage.name.split('.')[0];
  const extension = uploadedImage.type.replace('image/', '') as (typeof IMAGE_EXTENTIONS)[number];
  return { fileName, extension };
};
