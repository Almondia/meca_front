import React from 'react';

import getInnerComponents from '@/utils/getInnerComponent.s';

import {
  ControlLeftBox,
  ControlLeftBoxComponentType,
  ControlRightBox,
  ControlRightBoxComponentType,
} from './inner/ControlInnerBox';
import { BetweenControlGroupWrapper } from './styled';

const BetweenControlGroup = ({ children }: { children: React.ReactNode }) => {
  const leftBox = getInnerComponents(children, ControlLeftBoxComponentType);
  const rightBox = getInnerComponents(children, ControlRightBoxComponentType);
  return (
    <BetweenControlGroupWrapper>
      {!leftBox ? <div>&nbsp;</div> : leftBox}
      {rightBox}
    </BetweenControlGroupWrapper>
  );
};

BetweenControlGroup.Left = ControlLeftBox;
BetweenControlGroup.Right = ControlRightBox;

export default BetweenControlGroup;
