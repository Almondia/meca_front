import { useEffect, useState } from 'react';

import Icon from '@/components/@common/atoms/Icon';
import useThrottle from '@/hooks/useThrottle';
import { HiddenText } from '@/styles/common';

import { LikeButtonWrapper } from './styled';

interface LikeButtonProps {
  buttonName?: string;
  likeCount: number;
  onClick: () => boolean;
  defaultActiveState: boolean;
  disabled: boolean;
}

const LikeButton = ({
  buttonName = '추천 버튼',
  likeCount,
  onClick,
  defaultActiveState,
  disabled,
}: LikeButtonProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleLikeButtonClick = useThrottle(() => {
    !disabled && setIsActive(onClick());
  }, 300);
  useEffect(() => {
    setIsActive(defaultActiveState);
  }, [defaultActiveState]);
  return (
    <LikeButtonWrapper onClick={handleLikeButtonClick} isActive={isActive}>
      <Icon icon="Like" color={isActive ? 'white' : 'var(--color-gray)'} size="16px" />
      <HiddenText>{buttonName}</HiddenText>
      <p className="like-count">{likeCount}</p>
    </LikeButtonWrapper>
  );
};

export default LikeButton;
