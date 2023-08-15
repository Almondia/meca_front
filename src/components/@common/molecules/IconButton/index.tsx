import Icon, { IconType } from '@/components/@common/atoms/Icon';
import { HiddenText } from '@/styles/common';

import { IconButtonWrapper } from './styled';

export interface IconButtonProps {
  /** 존재하는 svg 아이콘 이름 */
  icon: IconType;
  /** 아이콘 사이즈: `단위: px` */
  iconSize?: number;
  /** 아이콘 색상: `기본값: theme textColor` */
  color?: string;
  /** 아이콘 버튼의 의도를 나타낼 숨겨질 텍스트 */
  name?: string;
  /** 마우스오버 효과 `기본값: true` */
  hasHoverEffect?: boolean;
  onClick: () => void;
}

const IconButton = ({
  icon,
  iconSize = 20,
  color = 'var(--color-text)',
  name = '???',
  hasHoverEffect,
  onClick,
}: IconButtonProps) => (
  <IconButtonWrapper iconSize={iconSize} onClick={onClick} hasHoverEffect={hasHoverEffect ?? true}>
    <Icon icon={icon} size={`${iconSize}px`} color={color} />
    <HiddenText>{name}</HiddenText>
  </IconButtonWrapper>
);

export default IconButton;
