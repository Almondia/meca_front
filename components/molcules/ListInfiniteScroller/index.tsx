import { JSXElementConstructor, ReactElement } from 'react';

import GridList from './listType/GridList';
import MasonryList from './listType/MasonryList';
import { ListInfiniteScrollerWrapper } from './styled';

export interface ListInfiniteScrollerProps {
  loader: ReactElement<any, string | JSXElementConstructor<any>>;
  loadMore: () => void;
  hasMore?: boolean;
  children: React.ReactNode;
  type: 'grid' | 'masonry';
}

const ListByType = {
  grid: GridList,
  masonry: MasonryList,
} as const;

const ListInfiniteScroller = ({ children, loader, loadMore, hasMore, type }: ListInfiniteScrollerProps) => (
  <ListInfiniteScrollerWrapper loader={loader} loadMore={loadMore} hasMore={hasMore}>
    {ListByType[type]({ children })}
  </ListInfiniteScrollerWrapper>
);

export default ListInfiniteScroller;
