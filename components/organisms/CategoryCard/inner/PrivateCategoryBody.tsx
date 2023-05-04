import ProgressBar from '@/components/atoms/ProgressBar';
import DotMenuOpener from '@/components/molcules/DotMenuOpener';
import DropdownMenu from '@/components/molcules/DropdownMenu';
import CategoryDeleteDialog from '@/components/organisms/CategoryDeleteDialog';
import CategoryUpdateDialog from '@/components/organisms/CategoryUpdateDialog';
import useModal from '@/hooks/useModal';
import { COLOR } from '@/styles/constants';
import { CategoryDetailType } from '@/types/domain';

import { CategoryCardBodyContainer, ProgressesInfoContainer } from '../styled';

const PrivateCategoryBody = ({
  categoryId,
  title,
  solveCount,
  totalCount,
  scoreAvg,
  thumbnail,
  shared,
}: CategoryDetailType) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const { visible: isUpdateModalVisible, open: updateModalOpen, close: updateModalClose } = useModal();
  return (
    <CategoryCardBodyContainer>
      <ProgressesInfoContainer>
        <p>문제개수</p>
        <ProgressBar
          type="devision"
          maxValue={totalCount}
          currentValue={solveCount}
          backgroundColor={[COLOR.brand3, COLOR.brand1]}
        />
      </ProgressesInfoContainer>
      <ProgressesInfoContainer>
        <p> 정답률 </p>
        <ProgressBar
          type="percentage"
          maxValue={100}
          currentValue={scoreAvg}
          backgroundColor={['#71D4B6', COLOR.success]}
        />
      </ProgressesInfoContainer>
      <DotMenuOpener top="14px" right="14px" name={`${title}제목의 카테고리 수정 삭제 버튼 오프너`}>
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
              shared={shared}
              visible={isDeleteModalVisible}
              onClose={deleteModalClose}
            />
          )}
          {isUpdateModalVisible && (
            <CategoryUpdateDialog
              categoryId={categoryId}
              categoryTitle={title}
              thumbnail={thumbnail}
              isShared={shared}
              visible={isUpdateModalVisible}
              onClose={updateModalClose}
            />
          )}
        </DropdownMenu>
      </DotMenuOpener>
    </CategoryCardBodyContainer>
  );
};

export const PrivateCategoryBodyComponentType: typeof PrivateCategoryBody extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = PrivateCategoryBody as any;

export default PrivateCategoryBody;
