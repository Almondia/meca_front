import LoadSpinner from '@/components/@common/atoms/LoadSpinner';
import DeferredComponent from '@/components/@util/DeferredComponent';
import useIntersect from '@/hooks/useIntersect';

import GridList from './listType/GridList';
import MasonryList from './listType/MasonryList';
import WideList from './listType/WideList';
import { InfiniteListIntersectionBox, InfiniteListWrapper } from './styled';

interface ListInfiniteScrollerProps {
  loader?: React.ReactNode;
  loadMore: () => void;
  hasNext?: boolean;
  children: React.ReactNode;
  type: 'grid' | 'masonry' | 'wide';
}

const ListByType = {
  grid: GridList,
  masonry: MasonryList,
  wide: WideList,
} as const;

const intersectionOptions = { rootMargin: '100% 0px' } as const;

const InfiniteList = ({ children, loader, loadMore, hasNext, type }: ListInfiniteScrollerProps) => {
  const ref = useIntersect<HTMLDivElement>(loadMore, intersectionOptions, hasNext);
  return (
    <InfiniteListWrapper>
      {ListByType[type]({ children })}
      {hasNext && <DeferredComponent>{loader || <LoadSpinner width="100%" height="100px" />}</DeferredComponent>}
      <InfiniteListIntersectionBox ref={ref} />
    </InfiniteListWrapper>
  );
};

export default InfiniteList;
