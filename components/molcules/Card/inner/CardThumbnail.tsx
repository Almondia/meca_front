import Image from 'next/image';
import Link from 'next/link';

import { MEDIA } from '@/styles/constants';
import { PreloadedImageInfo } from '@/types/common';
import { THUMBNAIL_BLUR_URL } from '@/utils/constants';

import { CardThumbnailWrapper } from '../styled';

interface CardThumbnailProps {
  href: string;
  src: string;
  altText: string;
  preloadedInfo?: PreloadedImageInfo;
  onError?: () => void;
}

const getRatioSize = (preloadedInfo?: PreloadedImageInfo) => {
  if (!preloadedInfo) {
    return { ratioWidth: 2, ratioHeight: 1 };
  }
  const { width: ratioWidth, height: ratioHeight } =
    preloadedInfo.width / preloadedInfo.height < 1 / 2 ? { width: 1, height: 2 } : preloadedInfo;
  return { ratioWidth, ratioHeight };
};

export const CardThumbnail = ({ href, src, altText, preloadedInfo, onError }: CardThumbnailProps) => {
  const { ratioWidth, ratioHeight } = getRatioSize(preloadedInfo);
  return (
    <Link href={href}>
      <CardThumbnailWrapper ratioWidth={ratioWidth} ratioHeight={ratioHeight}>
        <Image
          src={src}
          fill
          alt={altText}
          onError={(e) => {
            if (onError) {
              onError();
              return;
            }
            const imageElement = e.target;
            (imageElement as HTMLImageElement).src = '/images/noimage.png';
          }}
          blurDataURL={preloadedInfo?.blurDataURL ?? THUMBNAIL_BLUR_URL}
          placeholder="blur"
          sizes={`${MEDIA.mobile} 92vw, (max-width: 632px) 92vw, ${MEDIA.tablet} 46vw, 320px`}
        />
      </CardThumbnailWrapper>
    </Link>
  );
};

export const CardThumbnailComponentType: typeof CardThumbnail extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = CardThumbnail as any;
