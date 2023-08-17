import type { PropsWithChildren } from 'react';

import { CSSProperties } from 'styled-components';

import { SkeletonContentWrapper, SkeletonWrapper } from './styled';

interface SkeletonProps {
  style?: CSSProperties;
}

const Content = ({ style }: SkeletonProps) => (
  <SkeletonContentWrapper style={style} className="skeleton-item">
    &nbsp;
  </SkeletonContentWrapper>
);

const Skeleton = ({ children, style }: PropsWithChildren<SkeletonProps>) => (
  <SkeletonWrapper style={style}>{children}</SkeletonWrapper>
);

Skeleton.Content = Content;
export default Skeleton;
