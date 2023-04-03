import { InfiniteData } from '@tanstack/react-query';

import { MecaListResponse } from '@/apis/mecaApi';
import MecaCard from '@/components/molcules/MecaCard';
import { MECA_RESPONE_TO_TAG } from '@/types/domain';
import EmptyPagination from '@/components/layout/EmptyPagination';
import LoadSpinner from '@/components/atoms/LoadSpinner';

import { MecaListWrapper } from './styled';

export interface MecaListProps {
  mecaList?: InfiniteData<MecaListResponse>;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isMine?: boolean;
}

const MecaList = ({ mecaList, hasNextPage, fetchNextPage, isMine }: MecaListProps) => {
  if (!mecaList || !mecaList.pages?.[0].contents.length) {
    return <EmptyPagination />;
  }
  return (
    <MecaListWrapper
      loader={<LoadSpinner key={Number(mecaList.pageParams[1]) ?? 0} width="100%" />}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
    >
      {mecaList?.pages.map((pages) =>
        pages.contents.map((meca) => (
          <MecaCard
            key={meca.cardId}
            cardId={meca.cardId}
            categoryId={pages.categoryId}
            title={meca.title}
            question={meca.question}
            tagType={MECA_RESPONE_TO_TAG[meca.cardType]}
            isMine={isMine}
          />
        )),
      )}
    </MecaListWrapper>
  );
};

export default MecaList;
