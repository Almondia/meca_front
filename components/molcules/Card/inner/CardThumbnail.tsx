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

export const CardThumbnail = ({ href, src, altText, preloadedInfo, onError }: CardThumbnailProps) => (
  <Link href={href}>
    <CardThumbnailWrapper preloadedSize={preloadedInfo && { ...preloadedInfo }}>
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
        placeholder={preloadedInfo ? 'blur' : 'empty'}
        sizes={`${MEDIA.mobile} 92vw, (max-width: 632px) 92vw, ${MEDIA.tablet} 46vw, 320px`}
      />
    </CardThumbnailWrapper>
  </Link>
);

export const CardThumbnailComponentType: typeof CardThumbnail extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = CardThumbnail as any;
