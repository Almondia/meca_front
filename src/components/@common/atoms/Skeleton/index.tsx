import type { PropsWithChildren } from 'react';

import { CSSProp } from 'styled-components';

import { SkeletonContentWrapper, SkeletonWrapper } from './styled';

interface SkeletonProps {
  style?: CSSProp;
}

const Content = ({ style }: SkeletonProps) => (
  <SkeletonContentWrapper css={style} className="skeleton-item">
    &nbsp;
  </SkeletonContentWrapper>
);

const Skeleton = ({ children, style }: PropsWithChildren<SkeletonProps>) => (
  <SkeletonWrapper css={style}>{children}</SkeletonWrapper>
);

Skeleton.Content = Content;
export default Skeleton;
