import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Meca } from '@/types/domain/meca';
import { User } from '@/types/domain/user';

import LinkButton from '@/components/@common/atoms/LinkButton';
import AvatarUser from '@/components/@common/molecules/AvatarUser';
import BetweenSection from '@/components/@common/molecules/BetweenSection';
import useModal from '@/hooks/useModal';
import { combineUUID } from '@/utils/uuidHandler';

const MecaDeleteDialog = dynamic(() => import('@/components/meca/organisms/MecaDeleteDialog'), { ssr: false });

interface MecaPostHeaderProps {
  meca: Meca;
  user: User;
  isMine?: boolean;
}

const MecaPostHeader = ({ meca, user, isMine }: MecaPostHeaderProps) => {
  const router = useRouter();
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const handleUpdateButtonClick = () => {
    router.push(`/category/${meca.categoryId}/write-card/?cardId=${meca.cardId}`);
  };
  const handleShowCategoryButtonClick = () => {
    router.push(`/category/${combineUUID(user.memberId, meca.categoryId)}`);
  };

  return (
    <>
      <BetweenSection>
        <BetweenSection.Left>
          <AvatarUser {...user} />
        </BetweenSection.Left>
        <BetweenSection.Right>
          {isMine ? (
            <>
              <LinkButton onClick={handleUpdateButtonClick} textSize="main">
                수정하기
              </LinkButton>
              <LinkButton onClick={deleteModalOpen} textSize="main">
                삭제하기
              </LinkButton>
            </>
          ) : (
            <LinkButton onClick={handleShowCategoryButtonClick} textSize="main">
              카테고리 보기
            </LinkButton>
          )}
        </BetweenSection.Right>
      </BetweenSection>
      {isMine && isDeleteModalVisible && (
        <MecaDeleteDialog
          cardId={meca.cardId}
          categoryId={meca.categoryId}
          cardTitle={meca.title}
          visible={isDeleteModalVisible}
          onClose={deleteModalClose}
        />
      )}
    </>
  );
};

export default MecaPostHeader;
