import dynamic from 'next/dynamic';

import Button from '@/components/@common/atoms/Button';
import PageTitle from '@/components/@common/atoms/PageTitle';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import { CategoryListHeaderWrapper } from '@/components/category/organisms/CategoryListHeader/styled';
import useModal from '@/hooks/useModal';

const CategoryUpdateDialog = dynamic(() => import('@/components/category/organisms/CategoryUpdateDialog'));

const CategoryListHeader = ({
  pageTitle,
  hasAddButton = false,
}: {
  pageTitle: React.ReactNode;
  hasAddButton?: boolean;
}) => {
  const { visible: addCategoryVisible, open: addCategoryOpen, close: addCategoryClose } = useModal();
  return (
    <CategoryListHeaderWrapper>
      <BetweenSection>
        <BetweenSection.Left>
          <PageTitle style={{ marginBottom: '0px' }}>{pageTitle}</PageTitle>
        </BetweenSection.Left>
        <BetweenSection.Right>
          {hasAddButton && (
            <>
              <Button colorTheme="primary" size="small" onClick={addCategoryOpen}>
                추가하기 +
              </Button>
              {addCategoryVisible && hasAddButton && (
                <CategoryUpdateDialog
                  categoryTitle=""
                  visible={addCategoryVisible}
                  onClose={addCategoryClose}
                  thumbnail=""
                />
              )}
            </>
          )}
        </BetweenSection.Right>
      </BetweenSection>
    </CategoryListHeaderWrapper>
  );
};

export default CategoryListHeader;
