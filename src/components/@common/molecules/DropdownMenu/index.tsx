/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import dynamic from 'next/dynamic';

import { ReactElement, useCallback, useRef, useState } from 'react';

import type { ElementSizeType } from '@/types/common';

import useClickAway from '@/hooks/useClickAway';

import { DropdownMenuContentsContainer, DropdownMenuWrapper } from './styled';

const DropdownMenuContent = dynamic(() => import('./inner/DropdownMenuContent'));

interface DropdownMenuProps {
  wrapperComponent: ({ onClick }: { onClick: () => void }) => ReactElement;
  children: React.ReactNode;
  scale?: number;
  width?: ElementSizeType;
  menuDirection?: 'left' | 'right';
}

const DropdownMenu = ({
  wrapperComponent,
  children,
  scale = 1,
  width = '100px',
  menuDirection = 'right',
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
    <DropdownMenuWrapper ref={ref}>
      {wrapperComponent({ onClick: handleSwitchMenu })}
      <div className="dropdown-menu">
        {isVisible && (
          <DropdownMenuContentsContainer
            width={width}
            direction={menuDirection}
            scale={scale}
            onClick={() => setIsVisible(false)}
          >
            {children}
          </DropdownMenuContentsContainer>
        )}
      </div>
    </DropdownMenuWrapper>
  );
};

DropdownMenu.Menu = DropdownMenuContent;
// FIX: need fix;
export default DropdownMenu;
