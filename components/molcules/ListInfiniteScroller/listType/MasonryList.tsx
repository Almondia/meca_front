import { useEffect, useState } from 'react';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { MasonryListWrapper } from '../styled';

const MasonryList = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    !isMounted && setIsMounted(true);
  }, [isMounted]);
  return (
    <MasonryListWrapper isMounted={isMounted}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 360: 1, 632: 2, 992: 3, 1440: 4 }}>
        <Masonry gutter="32px">{children}</Masonry>
      </ResponsiveMasonry>
    </MasonryListWrapper>
  );
};

export default MasonryList;
