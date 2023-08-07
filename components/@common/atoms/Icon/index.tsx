import { memo } from 'react';

import styled from 'styled-components';

import Icons from './Icons';

export type IconType = keyof typeof Icons;

interface IconProps {
  /** [필수] 사용 할 아이콘 타입(이름) */
  icon: IconType;
  /** [선택] 아이콘 색상 */
  color?: string;
  /** [선택] 아이콘 크기 */
  size?: string;
}

const IconLayout = styled.div<Pick<IconProps, 'color' | 'size'>>`
  display: inline-block;
  & > svg {
    fill: ${(props) => props.color || 'currentColor' || 'var(--color-text)'};
    width: ${(props) => props.size || '24px'};
    height: ${(props) => props.size || '24px'};
  }
`;

/**
 * svg icon을 등록하고 해당 아이콘의 이름을 사용해 Icon 컴포넌트를 생성합니다.
 *
 * - size는 기본 24px이며 폭과 너비는 같습니다. string으로 사이즈를 지정할 수 있습니다.
 * - color는 기본으로 제공되는 색상 또는 theme text color이며 rgb또는 코드를 입력하여 색상을 설정합니다.
 */
const Icon = memo(({ icon, color, size }: IconProps) => {
  const SVGIcon = Icons[icon] as any;
  return (
    <IconLayout color={color} size={size}>
      <SVGIcon viewBox="0 0 24 24" />
    </IconLayout>
  );
});

export default Icon;
