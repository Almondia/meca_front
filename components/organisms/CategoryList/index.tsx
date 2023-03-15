/* eslint-disable react/no-array-index-key */
import { InfiniteData } from '@tanstack/react-query';

import CategoryCard from '@/components/molcules/CategoryCard';
import { CategoriesResponse } from '@/apis/categoryApi';

import { CategoryListWrapper, EmptyCategoryList } from './styled';

export interface CategoryListProps {
  categoryList?: InfiniteData<CategoriesResponse>;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

const CategoryList = ({ categoryList, fetchNextPage, hasNextPage }: CategoryListProps) => {
  if (!categoryList || !categoryList.pages?.[0].contents.length) {
    // TODO: 목록 비어있을 경우에 대한 컴포넌트 만들기
    return <EmptyCategoryList>목록이 없습니다</EmptyCategoryList>;
  }
  return (
    <CategoryListWrapper
      loader={<div key={Number(categoryList.pageParams[1]) ?? 0}>...loading</div>}
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
