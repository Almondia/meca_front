import { PrivateCategoriesResponse, SharedCategoriesResponse } from '@/apis/categoryApi';
import EmptyList from '@/components/atoms/EmptyList';
import InfiniteList from '@/components/molcules/InfiniteList';
import CategoryCard from '@/components/organisms/CategoryCard';
import { CategoryDetailType, CategoryType, UserProfile } from '@/types/domain';

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
    <InfiniteList type="grid" loadMore={fetchNextPage} hasNext={hasNextPage}>
      {categoryList.contents.map((category) => (
        <CategoryCard key={category.categoryId} {...category}>
          {determineContentsIsPrivate(category) ? (
            <CategoryCard.Private {...category} />
          ) : (
            <CategoryCard.Shared {...category} />
          )}
        </CategoryCard>
      ))}
    </InfiniteList>
  );
};

export default CategoryList;
