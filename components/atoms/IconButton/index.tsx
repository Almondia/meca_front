import { useTheme } from 'styled-components';

import { IconType } from '@/components/icons/type';
import { ElementSizeType } from '@/types/common';

import { IconButtonWrapper } from './styled';

import Icon from '../Icon';

export interface IconButtonProps {
  /** 존재하는 svg 아이콘 이름 */
  icon: IconType;
  /** 내부 아이콘 사이즈: `px`, `rem`, `%` */
  iconSize?: ElementSizeType;
  /** 아이콘 색상: `기본값: theme textColor` */
  color?: string;
  onClick: () => void;
}

const IconButton = ({ icon, iconSize = '20px', color, onClick }: IconButtonProps) => (
  <IconButtonWrapper onClick={onClick}>
    <Icon icon={icon} size={iconSize} color={color ?? 'var(--color-text)'} />
  </IconButtonWrapper>
);

export default IconButton;
