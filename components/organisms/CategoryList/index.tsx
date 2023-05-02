/* eslint-disable react/no-array-index-key */
import { InfiniteData } from '@tanstack/react-query';

import { PrivateCategoriesResponse, SharedCategoriesResponse } from '@/apis/categoryApi';
import LoadSpinner from '@/components/atoms/LoadSpinner';
import EmptyPagination from '@/components/layout/EmptyPagination';
import ListInfiniteScroller from '@/components/molcules/ListInfiniteScroller';
import CategoryCard from '@/components/organisms/CategoryCard';
import { CategoryDetailType, CategoryType, UserProfile } from '@/types/domain';

export interface CategoryListProps {
  categoryList?: InfiniteData<PrivateCategoriesResponse | SharedCategoriesResponse>;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

function determineContentsIsPrivate(
  contents: CategoryDetailType | (CategoryType & UserProfile),
): contents is CategoryDetailType {
  return (contents as CategoryDetailType).solveCount !== undefined;
}

const CategoryList = ({ categoryList, fetchNextPage, hasNextPage }: CategoryListProps) => {
  if (!categoryList || !categoryList.pages?.[0].contents.length) {
    return <EmptyPagination />;
  }
  return (
    <ListInfiniteScroller
      type="grid"
      loader={<LoadSpinner key={Number(categoryList.pageParams[1]) ?? 0} width="100%" />}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
    >
      {categoryList.pages.map((pages) =>
        pages.contents.map((category) => (
          <CategoryCard key={category.categoryId} {...category}>
            {determineContentsIsPrivate(category) ? (
              <CategoryCard.Private {...category} />
            ) : (
              <CategoryCard.Shared {...category} />
            )}
          </CategoryCard>
        )),
      )}
    </ListInfiniteScroller>
  );
};

export default CategoryList;
