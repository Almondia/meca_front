import { InfiniteData } from '@tanstack/react-query';

import { MecaUserListResponse } from '@/apis/mecaApi';
import EmptyList from '@/components/atoms/EmptyList';
import LoadSpinner from '@/components/atoms/LoadSpinner';
import ListInfiniteScroller from '@/components/molcules/ListInfiniteScroller';
import MecaCard from '@/components/organisms/MecaCard';
import { MECA_RESPONE_TO_TAG } from '@/types/domain';

export interface MecaListProps {
  mecaList?: InfiniteData<MecaUserListResponse>;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isMine?: boolean;
}

const MecaList = ({ mecaList, hasNextPage, fetchNextPage, isMine }: MecaListProps) => {
  if (!mecaList || !mecaList.pages?.[0].contents.length) {
    return <EmptyList />;
  }
  return (
    <ListInfiniteScroller
      type="masonry"
      loader={<LoadSpinner key={Number(mecaList.pageParams[1]) ?? 0} width="100%" />}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
    >
      {mecaList.pages.map((pages) =>
        pages.contents.map((meca) => (
          <MecaCard
            key={meca.cardId}
            cardId={meca.cardId}
            categoryId={pages.category.categoryId}
            memberId={meca.memberId}
            title={meca.title}
            question={meca.question}
            description={meca.description}
            tagType={MECA_RESPONE_TO_TAG[meca.cardType]}
            isMine={isMine}
          />
        )),
      )}
    </ListInfiniteScroller>
  );
};

export default MecaList;
