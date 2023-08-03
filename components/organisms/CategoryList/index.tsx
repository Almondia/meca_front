/* eslint-disable react/no-array-index-key */
import dynamic from 'next/dynamic';

import { InfiniteData } from '@tanstack/react-query';

import { PrivateCategoriesResponse, SharedCategoriesResponse } from '@/apis/categoryApi';
import EmptyList from '@/components/atoms/EmptyList';
import ListInfiniteScroller from '@/components/molcules/ListInfiniteScroller';
import CategoryCard from '@/components/organisms/CategoryCard';
import { CategoryDetailType, CategoryType, UserProfile } from '@/types/domain';

const LoadSpinner = dynamic(() => import('@/components/atoms/LoadSpinner'));

export interface CategoryListProps {
  categoryList: PrivateCategoriesResponse | SharedCategoriesResponse;
  hasNextPage?: boolean;
  isEmpty?: boolean;
  fetchNextPage: () => void;
}

function determineContentsIsPrivate(
  contents: CategoryDetailType | (CategoryType & UserProfile),
): contents is CategoryDetailType {
  return (contents as CategoryDetailType).solveCount !== undefined;
}

const CategoryList = ({ categoryList, fetchNextPage, hasNextPage, isEmpty }: CategoryListProps) => {
  if (isEmpty) {
    return <EmptyList />;
  }
  return (
    <ListInfiniteScroller
      type="grid"
      loader={<LoadSpinner width="100%" />}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
    >
      {categoryList.contents.map((category) => (
        <CategoryCard key={category.categoryId} {...category}>
          {determineContentsIsPrivate(category) ? (
            <CategoryCard.Private {...category} />
          ) : (
            <CategoryCard.Shared {...category} />
          )}
        </CategoryCard>
      ))}
    </ListInfiniteScroller>
  );
};

export default CategoryList;
