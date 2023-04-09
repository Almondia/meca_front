/* eslint-disable react/no-array-index-key */
import { InfiniteData } from '@tanstack/react-query';

import { CategoriesResponse } from '@/apis/categoryApi';
import LoadSpinner from '@/components/atoms/LoadSpinner';
import EmptyPagination from '@/components/layout/EmptyPagination';
import CategoryCard from '@/components/molcules/CategoryCard';

import { CategoryListWrapper } from './styled';

export interface CategoryListProps {
  categoryList?: InfiniteData<CategoriesResponse>;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

const CategoryList = ({ categoryList, fetchNextPage, hasNextPage }: CategoryListProps) => {
  if (!categoryList || !categoryList.pages?.[0].contents.length) {
    return <EmptyPagination />;
  }
  return (
    <CategoryListWrapper
      loader={<LoadSpinner key={Number(categoryList.pageParams[1]) ?? 0} width="100%" />}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
    >
      {categoryList.pages.map((pages) =>
        pages.contents.map((category) => (
          <CategoryCard
            key={category.categoryId}
            categoryId={category.categoryId}
            title={category.title}
            thumbnail={category.thumbnail ?? ''}
          />
        )),
      )}
    </CategoryListWrapper>
  );
};

export default CategoryList;
