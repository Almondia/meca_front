import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { ListInfiniteScrollerGridContainer, ListInfiniteScrollerWrapper } from './styled';

export interface ListInfiniteScrollerProps {
  loader: ReactElement<any, string | JSXElementConstructor<any>>;
  loadMore: () => void;
  hasMore?: boolean;
  children: React.ReactNode;
  type: 'grid' | 'masonry';
}

const ListInfiniteScroller = ({ children, loader, loadMore, hasMore, type }: ListInfiniteScrollerProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(type === 'grid');
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <ListInfiniteScrollerWrapper loader={loader} loadMore={loadMore} hasMore={hasMore} visible={isLoaded.toString()}>
      {type === 'grid' ? (
        <ListInfiniteScrollerGridContainer>{children}</ListInfiniteScrollerGridContainer>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 360: 1, 732: 2, 992: 3, 1440: 4 }}>
          <Masonry gutter="32px">{children}</Masonry>
        </ResponsiveMasonry>
      )}
    </ListInfiniteScrollerWrapper>
  );
};

export default ListInfiniteScroller;
