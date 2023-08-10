import dynamic from 'next/dynamic';

import Button from '@/components/@common/atoms/Button';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import CategorySearchBar from '@/components/category/molecules/CategorySearchBar';
import useModal from '@/hooks/useModal';

const CategoryUpdateDialog = dynamic(() => import('@/components/category/organisms/CategoryUpdateDialog'));

interface CategoryListHeaderProps {
  query?: string;
  onChangeQuery: (query: string) => void;
  isMine?: boolean;
}

const CategoryListHeader = ({ query, onChangeQuery, isMine }: CategoryListHeaderProps) => {
  const { visible: addCategoryVisible, open: addCategoryOpen, close: addCategoryClose } = useModal();
  return (
    <BetweenSection>
      <BetweenSection.Left>
        <CategorySearchBar query={query} onChangeQuery={onChangeQuery} />
      </BetweenSection.Left>
      {isMine && (
        <BetweenSection.Right>
          <Button colorTheme="primary" size="small" onClick={addCategoryOpen}>
            추가하기 +
          </Button>
          {addCategoryVisible && (
            <CategoryUpdateDialog
              categoryTitle=""
              visible={addCategoryVisible}
              onClose={addCategoryClose}
              thumbnail=""
            />
          )}
        </BetweenSection.Right>
      )}
    </BetweenSection>
  );
};

export default CategoryListHeader;
