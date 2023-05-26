import { FONT_SIZE } from '@/styles/constants';

import { LinkButtonWrapper } from './styled';

const COLOR = {
  brand: 'var(--color-brand)',
  gray: 'var(--color-gray)',
} as const;

export interface LinkButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  textColor?: 'gray' | 'brand';
  textSize?: keyof typeof FONT_SIZE;
}

/**
 * 링크(a) UI의 button 컴포넌트
 */
const LinkButton = ({ children, onClick, textColor = 'gray', textSize = 'caption' }: LinkButtonProps) => (
  <LinkButtonWrapper onClick={onClick} textColor={COLOR[textColor]} textSize={textSize}>
    {children}
  </LinkButtonWrapper>
);

export default LinkButton;
