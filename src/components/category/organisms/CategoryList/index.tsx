import dynamic from 'next/dynamic';

import type { CategoryListPaginationResponse } from '@/types/domain/category';

import EmptyList from '@/components/@common/atoms/EmptyList';
import { cardSkeletons } from '@/components/@common/molecules/Card/CardSkeleton';
import InfiniteList from '@/components/@common/molecules/InfiniteList';
import DeferredComponent from '@/components/@util/DeferredComponent';

const CategoryCard = dynamic(() => import('@/components/category/organisms/CategoryCard'), { ssr: true });

interface CategoryListProps {
  categoryList: CategoryListPaginationResponse;
  hasNextPage?: boolean;
  isEmpty?: boolean;
  isMine?: boolean;
  fetchNextPage: () => void;
}

const CategoryList = ({ categoryList, fetchNextPage, hasNextPage, isEmpty, isMine }: CategoryListProps) => {
  if (isEmpty) {
    return <EmptyList />;
  }
  return (
    <InfiniteList type="grid" loadMore={fetchNextPage} hasNext={hasNextPage}>
      {categoryList.contents.map((content) => (
        <CategoryCard key={content.category.categoryId} {...content} isMine={categoryList.isMine} />
      ))}
      {hasNextPage && (
        <DeferredComponent>
          {cardSkeletons({
            keyId: 'category-list',
            length: 8,
            bodyHeight: isMine ? '52px' : '36px',
            thumbnailRatio: 2,
          })}
        </DeferredComponent>
      )}
    </InfiniteList>
  );
};

export default CategoryList;
