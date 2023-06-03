import dynamic from 'next/dynamic';

import IconTag from '@/components/atoms/IconTag';
import ProgressBar from '@/components/atoms/ProgressBar';
import Icon from '@/components/common/Icon';
import DotMenuOpener from '@/components/molcules/DotMenuOpener';
import DropdownMenu from '@/components/molcules/DropdownMenu';
import useModal from '@/hooks/useModal';
import { TextOverline } from '@/styles/common';
import { COLOR } from '@/styles/constants';
import { CategoryDetailType } from '@/types/domain';

import { CategoryCardBodyContainer, CategoryCardSharedTagBox, ProgressesInfoContainer } from '../styled';

const CategoryDeleteDialog = dynamic(() => import('@/components/organisms/CategoryDeleteDialog'));
const CategoryUpdateDialog = dynamic(() => import('@/components/organisms/CategoryUpdateDialog'));

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
      <DotMenuOpener top="14px" right="6px" name={`${title}제목의 카테고리 수정 삭제 버튼 오프너`}>
        <DropdownMenu>
          <DropdownMenu.Contents href="" onClick={updateModalOpen}>
            수정하기
          </DropdownMenu.Contents>
          <DropdownMenu.Contents href="" onClick={deleteModalOpen}>
            삭제하기
          </DropdownMenu.Contents>
        </DropdownMenu>
      </DotMenuOpener>
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
