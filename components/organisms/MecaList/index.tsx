import dynamic from 'next/dynamic';

import { MecaListResponse } from '@/apis/mecaApi';
import EmptyList from '@/components/atoms/EmptyList';
import ListInfiniteScroller from '@/components/molcules/ListInfiniteScroller';
import MecaCard from '@/components/organisms/MecaCard';
import { MECA_RESPONE_TO_TAG } from '@/types/domain';

const LoadSpinner = dynamic(() => import('@/components/atoms/LoadSpinner'));
export interface MecaListProps {
  mecaList: MecaListResponse;
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
    <ListInfiniteScroller
      type="masonry"
      loader={<LoadSpinner width="100%" />}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
    >
      {mecaList.contents.map(({ card, statistics }) => (
        <MecaCard
          key={card.cardId}
          tagType={MECA_RESPONE_TO_TAG[card.cardType]}
          isMine={isMine}
          {...card}
          {...statistics}
        />
      ))}
    </ListInfiniteScroller>
  );
};

export default MecaList;
