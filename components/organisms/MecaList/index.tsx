import { useEffect, useState } from 'react';

import { InfiniteData } from '@tanstack/react-query';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { MecaUserListResponse } from '@/apis/mecaApi';
import LoadSpinner from '@/components/atoms/LoadSpinner';
import EmptyPagination from '@/components/layout/EmptyPagination';
import MecaCard from '@/components/molcules/MecaCard';
import { MECA_RESPONE_TO_TAG } from '@/types/domain';

import { MecaListWrapper } from './styled';

export interface MecaListProps {
  mecaList?: InfiniteData<MecaUserListResponse>;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isMine?: boolean;
}

const MecaList = ({ mecaList, hasNextPage, fetchNextPage, isMine }: MecaListProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!mecaList || !mecaList.pages?.[0].contents.length) {
    return <EmptyPagination />;
  }
  return (
    <MecaListWrapper
      loader={<LoadSpinner key={Number(mecaList.pageParams[1]) ?? 0} width="100%" />}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
      visible={isLoaded}
    >
      <ResponsiveMasonry columnsCountBreakPoints={{ 360: 1, 576: 2, 842: 3, 1393: 4 }}>
        <Masonry gutter="16px">
          {mecaList?.pages.map((pages) =>
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
        </Masonry>
      </ResponsiveMasonry>
    </MecaListWrapper>
  );
};

export default MecaList;
