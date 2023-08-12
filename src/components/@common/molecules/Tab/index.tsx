/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';

import { ElementSizeType } from '@/types/common';

import { TabButton, TabWrapper } from './styled';

interface TabProps {
  initialSelectedIndex?: number;
  tabButtonProps: {
    name: string;
    onClick?: () => void;
  }[];
  minWidth?: ElementSizeType;
  forceSelectedIndex?: number;
}

const Tab = ({ initialSelectedIndex = 0, tabButtonProps, minWidth, forceSelectedIndex }: TabProps) => {
  const [selected, setSelected] = useState(initialSelectedIndex);

  useEffect(() => {
    if (forceSelectedIndex === undefined) {
      return;
    }
    setSelected(forceSelectedIndex);
  }, [forceSelectedIndex]);

  const handleClick = (index: number) => {
    if (selected === index) {
      return;
    }
    setSelected(index);
    tabButtonProps[index].onClick?.();
  };
  return (
    <TabWrapper>
      {tabButtonProps.map(({ name }, index) => (
        <TabButton key={index} onClick={() => handleClick(index)} isSelected={selected === index} minWidth={minWidth}>
          {name}
        </TabButton>
      ))}
    </TabWrapper>
  );
};

export default Tab;
