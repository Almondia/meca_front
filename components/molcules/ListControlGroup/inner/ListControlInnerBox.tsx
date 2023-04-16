import React from 'react';

import { ListControlBetweenContainer } from '../styled';

export const ListControlLeftBox = ({ children }: { children: React.ReactNode }) => (
  <ListControlBetweenContainer>{children}</ListControlBetweenContainer>
);

export const ListControlRightBox = ({ children }: { children: React.ReactNode }) => (
  <ListControlBetweenContainer>{children}</ListControlBetweenContainer>
);

export const listControlLeftBoxComponentType: typeof ListControlLeftBox extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = ListControlLeftBox as any;

export const listControlRightBoxComponentType: typeof ListControlRightBox extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = ListControlRightBox as any;
