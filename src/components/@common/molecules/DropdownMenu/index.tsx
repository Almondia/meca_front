/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dynamic from 'next/dynamic';

import { useCallback, useRef, useState } from 'react';

import LinkButton from '@/components/@common/atoms/LinkButton';
import IconButton from '@/components/@common/molecules/IconButton';
import useClickAway from '@/hooks/useClickAway';
import { HiddenText } from '@/styles/common';
import { ElementSizeType } from '@/types/common';

import { DropdownMenuContentsContainer, DropdownMenuWrapper } from './styled';

const DropdownMenuContent = dynamic(() => import('./inner/DropdownMenuContent'));

interface DropdownMenuProps {
  // default: <IconButton icon="VerticalDot"/>
  wrapperComponent?: React.ReactNode;
  children: React.ReactNode;
  top?: ElementSizeType;
  right?: ElementSizeType;
  name?: string;
  scale?: number;
}

const DropdownMenu = ({
  wrapperComponent,
  children,
  top = '0px',
  right = '0px',
  scale = 1,
  name,
}: DropdownMenuProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(
    ref,
    () => {
      setIsVisible(false);
    },
    isVisible,
  );

  const handleSwitchMenu = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);
  return (
    <DropdownMenuWrapper ref={ref} top={top} right={right} scale={scale}>
      {wrapperComponent ? (
        <LinkButton onClick={handleSwitchMenu}>
          {wrapperComponent}
          <HiddenText>{name}</HiddenText>
        </LinkButton>
      ) : (
        <IconButton
          icon="VerticalDot"
          iconSize="21px"
          color="var(--color-text)"
          onClick={handleSwitchMenu}
          name={name}
        />
      )}
      {isVisible && (
        <DropdownMenuContentsContainer onClick={() => setIsVisible(false)}>{children}</DropdownMenuContentsContainer>
      )}
    </DropdownMenuWrapper>
  );
};

DropdownMenu.Menu = DropdownMenuContent;
// FIX: need fix;
export default DropdownMenu;
