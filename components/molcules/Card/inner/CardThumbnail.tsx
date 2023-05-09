import Image from 'next/image';
import Link from 'next/link';

import { MEDIA } from '@/styles/constants';

import { CardThumbnailWrapper, CardThumbnailWrapper1 } from '../styled';

interface CardThumbnailProps {
  href: string;
  src: string;
  altText: string;
  blurURL?: string;
  hasStaticHeight?: boolean;
  onError?: () => void;
}

export const CardThumbnail = ({ href, src, altText, blurURL, hasStaticHeight, onError }: CardThumbnailProps) => (
  <Link href={href}>
    <CardThumbnailWrapper hasStaticHeight={hasStaticHeight}>
      <Image
        src={src}
        fill
        alt={altText}
        onError={onError}
        blurDataURL={blurURL ?? undefined}
        placeholder={blurURL ? 'blur' : 'empty'}
        sizes={`${MEDIA.mobile} 92vw, (max-width: 732px) 92vw, ${MEDIA.tablet} 46vw, 320px`}
      />
    </CardThumbnailWrapper>
    <CardThumbnailWrapper1 />
  </Link>
);

export const CardThumbnailComponentType: typeof CardThumbnail extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = CardThumbnail as any;
