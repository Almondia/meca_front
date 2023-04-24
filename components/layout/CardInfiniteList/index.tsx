import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { CardInfiniteGridContainer, CardInfiniteListWrapper } from './styled';

export interface CardInfiniteListProps {
  loader: ReactElement<any, string | JSXElementConstructor<any>>;
  loadMore: () => void;
  hasMore?: boolean;
  children: React.ReactNode;
  type: 'grid' | 'masonry';
}

const CardInfiniteList = ({ children, loader, loadMore, hasMore, type }: CardInfiniteListProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(type === 'grid');
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <CardInfiniteListWrapper loader={loader} loadMore={loadMore} hasMore={hasMore} visibility={isLoaded}>
      {type === 'grid' ? (
        <CardInfiniteGridContainer>{children}</CardInfiniteGridContainer>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 360: 1, 732: 2, 992: 3, 1440: 4 }}>
          <Masonry gutter="32px">{children}</Masonry>
        </ResponsiveMasonry>
      )}
    </CardInfiniteListWrapper>
  );
};

export default CardInfiniteList;
