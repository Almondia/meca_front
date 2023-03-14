import CategoryCard from '@/components/molcules/CategoryCard';
import { CategoryType } from '@/types/domain';

import { CategoryListWrapper, EmptyCategoryList } from './styled';

export interface CategoryListProps {
  categoryList?: CategoryType[];
}
const CategoryList = ({ categoryList }: CategoryListProps) => {
  if (!categoryList || categoryList.length === 0) {
    // TODO: 목록 비어있을 경우에 대한 컴포넌트 만들기
    return <EmptyCategoryList>목록이 없습니다</EmptyCategoryList>;
  }
  return (
    <CategoryListWrapper>
      {categoryList?.map((category) => (
        <CategoryCard key={category.categoryId} categoryId={category.categoryId} title={category.title} />
      ))}
    </CategoryListWrapper>
  );
};

export default CategoryList;
