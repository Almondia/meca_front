import { useEffect, useState } from 'react';

import Icon from '@/components/common/Icon';
import useThrottle from '@/hooks/useThrottle';

import { LikeButtonWrapper } from './styled';

export interface LikeButtonProps {
  onClick: () => void;
  defaultActiveState: boolean;
}

const LikeButton = ({ onClick, defaultActiveState }: LikeButtonProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleLikeButtonClick = useThrottle(() => {
    setIsActive((prev) => !prev);
    onClick();
  }, 400);
  useEffect(() => {
    setIsActive(defaultActiveState);
  }, [defaultActiveState]);
  return (
    <LikeButtonWrapper onClick={handleLikeButtonClick} isActive={isActive}>
      <Icon icon="Like" color={isActive ? 'white' : 'var(--color-gray)'} />
    </LikeButtonWrapper>
  );
};

export default LikeButton;