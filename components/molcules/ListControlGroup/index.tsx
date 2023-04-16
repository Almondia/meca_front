import React from 'react';

import getInnerComponents from '@/utils/getInnerComponent.s';

import {
  ListControlLeftBox,
  listControlLeftBoxComponentType,
  ListControlRightBox,
  listControlRightBoxComponentType,
} from './inner/ListControlInnerBox';
import { ListControlGroupWrapper } from './styled';

const ListControlGroup = ({ children }: { children: React.ReactNode }) => {
  const leftBox = getInnerComponents(children, listControlLeftBoxComponentType);
  const rightBox = getInnerComponents(children, listControlRightBoxComponentType);
  return (
    <ListControlGroupWrapper>
      {!leftBox ? <div>&nbsp;</div> : leftBox}
      {rightBox}
    </ListControlGroupWrapper>
  );
};

ListControlGroup.Left = ListControlLeftBox;
ListControlGroup.Right = ListControlRightBox;

export default ListControlGroup;
