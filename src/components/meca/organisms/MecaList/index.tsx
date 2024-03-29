import type { MecaListPaginationResponse } from '@/types/domain/meca';

import EmptyList from '@/components/@common/atoms/EmptyList';
import { cardSkeletons } from '@/components/@common/molecules/Card/CardSkeleton';
import InfiniteList from '@/components/@common/molecules/InfiniteList';
import MecaCard from '@/components/meca/organisms/MecaCard';

interface MecaListProps {
  mecaList: MecaListPaginationResponse;
  hasNextPage?: boolean;
  isEmpty?: boolean;
  fetchNextPage: () => void;
  isMine?: boolean;
}

const MecaList = ({ mecaList, hasNextPage, fetchNextPage, isMine, isEmpty }: MecaListProps) => {
  if (isEmpty) {
    return <EmptyList />;
  }
  return (
    <InfiniteList type="masonry" loadMore={fetchNextPage} hasNext={hasNextPage}>
      {mecaList.contents.map((content) => (
        <MecaCard key={content.card.cardId} isMine={isMine} {...content} />
      ))}
      {hasNextPage && cardSkeletons({ keyId: 'meca-list', length: 8 })}
    </InfiniteList>
  );
};

export default MecaList;
