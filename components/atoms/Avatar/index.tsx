import { useState } from 'react';

import { AvatarWrapper } from './styled';

export interface AvatarProps {
  imgSrc?: string;
  imgSize: 30 | 36 | 48 | 72 | 96 | 120;
  imgName: string;
}

const Avatar = ({ imgSrc, imgSize, imgName }: AvatarProps) => {
  const [src, setSrc] = useState(imgSrc || '/images/noprofile.png');
  return (
    <AvatarWrapper
      src={src}
      alt={`${imgName}-avatar`}
      width={imgSize}
      height={imgSize}
      onError={() => setSrc('/images/noprofile.png')}
    />
  );
};

export default Avatar;
