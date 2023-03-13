import { useRef, useState } from 'react';
import styled from 'styled-components';

import IconButton from '@/components/atoms/IconButton';
import useClickAway from '@/hooks/useClickAway';
import { ElementSizeType } from '@/types/common';

export interface DotMenuOpenerProps {
  /**
   * [필수] 해당 reactnode에 dot button을 클릭했을 때 식별될 컴포넌트가 들어감
   */
  children: React.ReactNode;
  top?: ElementSizeType;
  right?: ElementSizeType;
}

export const DotMenuOpenerWrapper = styled.div<Pick<DotMenuOpenerProps, 'right' | 'top'>>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  transform: scale(0.7);
`;

/**
 * vertical dot button 컴포넌트로 부가적인 메뉴를 열고 닫을 때 사용하는 컴포넌트이다.
 * 메뉴와 버튼 이외의 화면을 클릭하면 메뉴가 닫힌다.
 */
const DotMenuOpener = ({ children, top = '0px', right = '0px' }: DotMenuOpenerProps) => {
  const [isDotMenuVisible, setIsDotMenuVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => setIsDotMenuVisible(false));
  return (
    <DotMenuOpenerWrapper ref={ref} top={top} right={right}>
      <IconButton icon="VerticalDot" iconSize="21px" onClick={() => setIsDotMenuVisible((prev) => !prev)} />
      {isDotMenuVisible && children}
    </DotMenuOpenerWrapper>
  );
};

export default DotMenuOpener;
