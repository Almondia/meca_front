import ProgressBar from '@/components/atoms/ProgressBar';
import { COLOR } from '@/styles/constants';
import DropdownMenu from '@/components/atoms/DropdownMenu';
import CardTitle from '@/components/atoms/CardTitle';
import DotMenuOpener from '@/components/molcules/DotMenuOpener';
import useModal from '@/hooks/useModal';

import { CategoryCardWrapper, ProgressesInfoContainer } from './styled';

import CategoryDeleteDialog from '../CategoryDeleteDialog';
import CategoryUpdateDialog from '../CategoryUpdateDialog';

export interface CategoryCardProps {
  categoryId: string;
  title: string;
  maxCardCount?: number;
  solvedCardCount?: number;
  answeredRate?: number;
}

const CategoryCard = ({
  categoryId,
  title,
  answeredRate = 0,
  maxCardCount = 0,
  solvedCardCount = 0,
}: CategoryCardProps) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const { visible: isUpdateModalVisible, open: updateModalOpen, close: updateModalClose } = useModal();
  return (
    <CategoryCardWrapper data-testid="id-category-card">
      <CardTitle link={`/me/categories/${categoryId}`}>{title}</CardTitle>
      <DotMenuOpener top="14px" right="14px">
        <DropdownMenu>
          <DropdownMenu.Contents href="" onClick={updateModalOpen}>
            수정하기
          </DropdownMenu.Contents>
          <DropdownMenu.Contents href="" onClick={deleteModalOpen}>
            삭제하기
          </DropdownMenu.Contents>
          {isDeleteModalVisible && (
            <CategoryDeleteDialog
              categoryId={categoryId}
              categoryTitle={title}
              visible={isDeleteModalVisible}
              onClose={deleteModalClose}
            />
          )}
          {isUpdateModalVisible && (
            <CategoryUpdateDialog
              categoryId={categoryId}
              categoryTitle={title}
              visible={isUpdateModalVisible}
              onClose={updateModalClose}
            />
          )}
        </DropdownMenu>
      </DotMenuOpener>
      <ProgressesInfoContainer>
        <p>문제개수</p>
        <ProgressBar
          type="devision"
          maxValue={maxCardCount}
          currentValue={solvedCardCount}
          backgroundColor={[COLOR.brand3, COLOR.brand1]}
        />
      </ProgressesInfoContainer>
      <ProgressesInfoContainer>
        <p> 정답률 </p>
        <ProgressBar
          type="percentage"
          maxValue={100}
          currentValue={answeredRate}
          backgroundColor={['#71D4B6', COLOR.success]}
        />
      </ProgressesInfoContainer>
    </CategoryCardWrapper>
  );
};

export default CategoryCard;
