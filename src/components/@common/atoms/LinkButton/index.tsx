import styled from 'styled-components';

import { FONT_SIZE } from '@/styles/constants';

const COLOR = {
  brand: 'var(--color-brand)',
  gray: 'var(--color-gray)',
} as const;

const LinkButtonWrapper = styled.button<{ textColor: string; textSize: keyof typeof FONT_SIZE }>`
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.theme.fontSize[props.textSize]};
  color: ${(props) => props.textColor};
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

interface LinkButtonProps {
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
