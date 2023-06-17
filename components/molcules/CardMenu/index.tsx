/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, useState } from 'react';

import IconButton from '@/components/atoms/IconButton';
import useClickAway from '@/hooks/useClickAway';
import { ElementSizeType } from '@/types/common';

import CardMenuDropdown from './inner/CardMenuDropdown';
import { CardMenuWrapper } from './styled';

export interface CardMenuProps {
  children: React.ReactNode;
  top?: ElementSizeType;
  right?: ElementSizeType;
  name?: string;
}

const CardMenu = ({ children, top = '0px', right = '0px', name }: CardMenuProps) => {
  const [isDotMenuVisible, setIsDotMenuVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(
    ref,
    () => {
      setIsDotMenuVisible(false);
    },
    isDotMenuVisible,
  );

  return (
    <CardMenuWrapper ref={ref} top={top} right={right}>
      <IconButton icon="VerticalDot" iconSize="21px" onClick={() => setIsDotMenuVisible((prev) => !prev)} name={name} />
      {isDotMenuVisible && <div onClick={() => setIsDotMenuVisible(false)}>{children}</div>}
    </CardMenuWrapper>
  );
};

CardMenu.Dropdown = CardMenuDropdown;

export default CardMenu;
