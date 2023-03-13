import { Children, isValidElement } from 'react';

import { modalBodyComponentType } from './ModalBody';
import { modalCloseButtonComponentType } from './ModalCloseButton';
import { modalConfirmButtonComponentType } from './ModalConfirmButton';
import { modalTitleComponentType } from './ModalTitle';

export type ModalInnerComponentsType =
  | typeof modalTitleComponentType
  | typeof modalBodyComponentType
  | typeof modalConfirmButtonComponentType
  | typeof modalCloseButtonComponentType;

export const getModalInnerComponents = (children: React.ReactNode, innerComponent: ModalInnerComponentsType) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === innerComponent).slice(0, 2);
};
