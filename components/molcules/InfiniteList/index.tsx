import React from 'react';

import LoadSpinner from '@/components/atoms/LoadSpinner';
import useIntersect from '@/hooks/useIntersect';

import GridList from './listType/GridList';
import MasonryList from './listType/MasonryList';
import { InfiniteListIntersectionBox, InfiniteListWrapper } from './styled';

export interface ListInfiniteScrollerProps {
  loader?: React.ReactNode;
  loadMore: () => void;
  hasNext?: boolean;
  children: React.ReactNode;
  type: 'grid' | 'masonry';
}

const ListByType = {
  grid: GridList,
  masonry: MasonryList,
} as const;

const InfiniteList = ({ children, loader, loadMore, hasNext, type }: ListInfiniteScrollerProps) => {
  const ref = useIntersect<HTMLDivElement>(loadMore, { rootMargin: '30px 0px' }, hasNext);
  return (
    <InfiniteListWrapper>
      {ListByType[type]({ children })}
      {hasNext && (loader || <LoadSpinner width="100%" height="200px" />)}
      <InfiniteListIntersectionBox ref={ref} />
    </InfiniteListWrapper>
  );
};

export default InfiniteList;
