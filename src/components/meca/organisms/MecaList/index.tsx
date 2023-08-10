import { MecaListResponse } from '@/apis/mecaApi';
import EmptyList from '@/components/@common/atoms/EmptyList';
import InfiniteList from '@/components/@common/molecules/InfiniteList';
import MecaCard from '@/components/meca/organisms/MecaCard';

interface MecaListProps {
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
        <MecaCard key={card.cardId} tagType={card.cardType} isMine={isMine} {...card} {...statistics} />
      ))}
    </InfiniteList>
  );
};

export default MecaList;
