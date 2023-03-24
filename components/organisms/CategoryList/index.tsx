/* eslint-disable react/no-array-index-key */
import { InfiniteData } from '@tanstack/react-query';

import CategoryCard from '@/components/molcules/CategoryCard';
import { CategoriesResponse } from '@/apis/categoryApi';
import EmptyPagination from '@/components/layout/EmptyPagination';

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
      loader={
        <div data-testid="id-scroll-load-spinner" key={Number(categoryList.pageParams[1]) ?? 0}>
          ...loading
        </div>
      }
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
    >
      {categoryList.pages.map((pages) =>
        pages.contents.map((category) => (
          <CategoryCard key={category.categoryId} categoryId={category.categoryId} title={category.title} />
        )),
      )}
    </CategoryListWrapper>
  );
};

export default CategoryList;
