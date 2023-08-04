import { MecaListResponse } from '@/apis/mecaApi';
import EmptyList from '@/components/atoms/EmptyList';
import InfiniteList from '@/components/molcules/InfiniteList';
import MecaCard from '@/components/organisms/MecaCard';
import { MECA_RESPONE_TO_TAG } from '@/types/domain';

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
    <InfiniteList type="masonry" loadMore={fetchNextPage} hasNext={hasNextPage}>
      {mecaList.contents.map(({ card, statistics }) => (
        <MecaCard
          key={card.cardId}
          tagType={MECA_RESPONE_TO_TAG[card.cardType]}
          isMine={isMine}
          {...card}
          {...statistics}
        />
      ))}
    </InfiniteList>
  );
};

export default MecaList;
