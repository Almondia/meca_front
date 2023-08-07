import { useEffect, useState } from 'react';

import Icon from '@/components/@common/atoms/Icon';
import useThrottle from '@/hooks/useThrottle';
import { HiddenText } from '@/styles/common';

import { LikeButtonWrapper } from './styled';

interface LikeButtonProps {
  buttonName?: string;
  onClick: () => void;
  defaultActiveState: boolean;
  disabled: boolean;
}

const LikeButton = ({ buttonName = '추천 버튼', onClick, defaultActiveState, disabled }: LikeButtonProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleLikeButtonClick = useThrottle(() => {
    !disabled && setIsActive((prev) => !prev);
    onClick();
  }, 400);
  useEffect(() => {
    setIsActive(defaultActiveState);
  }, [defaultActiveState]);
  return (
    <LikeButtonWrapper onClick={handleLikeButtonClick} isActive={isActive}>
      <Icon icon="Like" color={isActive ? 'white' : 'var(--color-gray)'} />
      <HiddenText>{buttonName}</HiddenText>
    </LikeButtonWrapper>
  );
};

export default LikeButton;
