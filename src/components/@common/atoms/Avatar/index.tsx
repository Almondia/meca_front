/* eslint-disable import/prefer-default-export */
import Image from 'next/image';

import styled from 'styled-components';

interface AvatarProps {
  imgSrc?: string;
  imgSize: 30 | 36 | 48 | 72 | 96 | 120;
  imgName: string;
  priority?: boolean;
}

const AvatarWrapper = styled(Image)`
  border-radius: 100%;
`;

const Avatar = ({ imgSrc, imgSize, imgName, priority }: AvatarProps) => (
  <AvatarWrapper
    src={imgSrc || '/images/noprofile.png'}
    alt={`${imgName}-avatar`}
    width={imgSize}
    height={imgSize}
    priority={priority}
    onError={(e) => {
      const imageElement = e.target;
      (imageElement as HTMLImageElement).src = '/images/noprofile.png';
    }}
  />
);

export default Avatar;
