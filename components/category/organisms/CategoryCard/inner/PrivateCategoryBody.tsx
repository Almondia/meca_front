import dynamic from 'next/dynamic';

import Icon from '@/components/@common/atoms/Icon';
import DropdownMenu from '@/components/@common/molecules/DropdownMenu';
import IconTag from '@/components/@common/molecules/IconTag';
import ProgressBar from '@/components/@common/molecules/ProgressBar';
import useModal from '@/hooks/useModal';
import { TextOverline } from '@/styles/common';
import { COLOR } from '@/styles/constants';
import { CategoryDetailType } from '@/types/domain';

import { CategoryCardBodyContainer, CategoryCardSharedTagBox, ProgressesInfoContainer } from '../styled';

const CategoryUpdateDialog = dynamic(() => import('@/components/category/organisms/CategoryUpdateDialog'));
const CategoryDeleteDialog = dynamic(() => import('@/components/category/organisms/CategoryDeleteDialog'));

const PrivateCategoryBody = ({
  categoryId,
  title,
  solveCount,
  totalCount,
  likeCount,
  scoreAvg,
  thumbnail,
  shared,
}: CategoryDetailType) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const { visible: isUpdateModalVisible, open: updateModalOpen, close: updateModalClose } = useModal();
  return (
    <CategoryCardBodyContainer>
      <div>
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
      </div>
      <div>
        <Icon icon="Like" size="1rem" />
        <TextOverline style={{ textAlign: 'center' }}>{likeCount}</TextOverline>
      </div>
      <DropdownMenu scale={0.7} top="14px" right="6px" name={`${title}제목의 카테고리 수정 삭제 버튼 오프너`}>
        <DropdownMenu.Menu href="" onClick={updateModalOpen}>
          수정하기
        </DropdownMenu.Menu>
        <DropdownMenu.Menu href="" onClick={deleteModalOpen}>
          삭제하기
        </DropdownMenu.Menu>
      </DropdownMenu>
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
      {!shared && (
        <CategoryCardSharedTagBox data-testid="id-private-tag">
          <IconTag icon="Lock" text="비공개" scale={0.85} />
        </CategoryCardSharedTagBox>
      )}
    </CategoryCardBodyContainer>
  );
};

export const PrivateCategoryBodyComponentType: typeof PrivateCategoryBody extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = PrivateCategoryBody as any;

export default PrivateCategoryBody;