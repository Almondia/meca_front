import React from 'react';

import { BetweenControlInnerContainer } from '../styled';

export const ControlLeftBox = ({ children }: { children: React.ReactNode }) => (
  <BetweenControlInnerContainer>{children}</BetweenControlInnerContainer>
);

export const ControlRightBox = ({ children }: { children: React.ReactNode }) => (
  <BetweenControlInnerContainer>{children}</BetweenControlInnerContainer>
);

export const ControlLeftBoxComponentType: typeof ControlLeftBox extends (props: infer P) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = ControlLeftBox as any;

export const ControlRightBoxComponentType: typeof ControlRightBox extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = ControlRightBox as any;
