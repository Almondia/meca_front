import { AvatarWrapper } from './styled';

export interface AvatarProps {
  imgSrc?: string;
  imgSize: 30 | 36 | 48 | 72 | 96 | 120;
  imgName: string;
}

const Avatar = ({ imgSrc, imgSize, imgName }: AvatarProps) => (
  <AvatarWrapper
    src={imgSrc || '/images/noprofile.png'}
    alt={`${imgName}-avatar`}
    width={imgSize}
    height={imgSize}
    onError={(e) => {
      const imageElement = e.target;
      (imageElement as HTMLImageElement).src = '/images/noprofile.png';
    }}
  />
);
export default Avatar;
