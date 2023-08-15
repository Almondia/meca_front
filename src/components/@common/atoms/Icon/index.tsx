import { memo } from 'react';

import styled, { CSSProp } from 'styled-components';

import Icons from './Icons';

export type IconType = keyof typeof Icons;

interface IconProps {
  icon: IconType;
  color?: string;
  size?: string;
  style?: CSSProp;
}

const IconLayout = styled.div<Pick<IconProps, 'color' | 'size'>>`
  display: inline-block;
  & > svg {
    fill: ${(props) => props.color || 'currentColor' || 'var(--color-text)'};
    width: ${(props) => props.size || '24px'};
    height: ${(props) => props.size || '24px'};
  }
`;

const Icon = memo(({ icon, color, size, style }: IconProps) => {
  const SVGIcon = Icons[icon] as any;
  return (
    <IconLayout color={color} size={size} css={style}>
      <SVGIcon viewBox="0 0 24 24" />
    </IconLayout>
  );
});

export default Icon;
