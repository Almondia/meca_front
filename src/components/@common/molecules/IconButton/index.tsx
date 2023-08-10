import Icon, { IconType } from '@/components/@common/atoms/Icon';
import { HiddenText } from '@/styles/common';
import { ElementSizeType } from '@/types/common';

import { IconButtonWrapper } from './styled';

export interface IconButtonProps {
  /** 존재하는 svg 아이콘 이름 */
  icon: IconType;
  /** 내부 아이콘 사이즈: `px`, `rem`, `%` */
  iconSize?: ElementSizeType;
  /** 아이콘 색상: `기본값: theme textColor` */
  color?: string;
  /** 아이콘 버튼의 의도를 나타낼 숨겨질 텍스트 */
  name?: string;
  onClick: () => void;
}

const IconButton = ({
  icon,
  iconSize = '20px',
  color = 'var(--color-text)',
  name = '???',
  onClick,
}: IconButtonProps) => (
  <IconButtonWrapper onClick={onClick}>
    <Icon icon={icon} size={iconSize} color={color} />
    <HiddenText>{name}</HiddenText>
  </IconButtonWrapper>
);

export default IconButton;
