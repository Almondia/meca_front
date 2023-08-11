import dynamic from 'next/dynamic';

import type { CategoryListPaginationResponse } from '@/types/domain/category';

import EmptyList from '@/components/@common/atoms/EmptyList';
import InfiniteList from '@/components/@common/molecules/InfiniteList';

const CategoryCard = dynamic(() => import('@/components/category/organisms/CategoryCard'), { ssr: true });

interface CategoryListProps {
  categoryList: CategoryListPaginationResponse;
  hasNextPage?: boolean;
  isEmpty?: boolean;
  fetchNextPage: () => void;
}

const CategoryList = ({ categoryList, fetchNextPage, hasNextPage, isEmpty }: CategoryListProps) => {
  if (isEmpty) {
    return <EmptyList />;
  }
  return (
    <InfiniteList type="grid" loadMore={fetchNextPage} hasNext={hasNextPage}>
      {categoryList.contents.map((content) => (
        <CategoryCard key={content.category.categoryId} {...content} isMine={categoryList.isMine} />
      ))}
    </InfiniteList>
  );
};

export default CategoryList;
