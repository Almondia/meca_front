import CardTitle from '@/components/atoms/CardTitle';
import DropdownMenu from '@/components/atoms/DropdownMenu';
import MecaTag from '@/components/atoms/MecaTag';
import useModal from '@/hooks/useModal';
import { MecaTagType } from '@/types/domain';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

import { MecaCardWrapper, MecaQuestionTextContainer, MecaTagContainer } from './styled';

import DotMenuOpener from '../DotMenuOpener';
import MecaDeleteDialog from '../MecaDeleteDialog';

export interface MecaCardProps {
  cardId: string;
  categoryId: string;
  title: string;
  question: string;
  tagType: MecaTagType;
  /** 다른 사용자의 카테고리에 대한 카드와 내 것에 차이가 있음 */
  isMine?: boolean;
}

/** 문제 카드 컴포넌트 */
const MecaCard = ({ cardId, categoryId, title, question, tagType, isMine }: MecaCardProps) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  return (
    <MecaCardWrapper data-testid="id-meca-card">
      <CardTitle link={isMine ? `/me/meca/${cardId}` : `/meca/${cardId}`}>{title}</CardTitle>
      <MecaQuestionTextContainer>
        {tagType === 'select' ? stringToJsonStringArrayConverter(question)[0] : question}
      </MecaQuestionTextContainer>
      <MecaTagContainer>
        <MecaTag tagName={tagType} />
      </MecaTagContainer>
      {isMine && (
        <>
          <DotMenuOpener top="14px" right="14px" name={`${title}카드 수정 삭제 메뉴 오프너`}>
            <DropdownMenu>
              <DropdownMenu.Contents href={`/me/write/${categoryId}?cardId=${cardId}`}>수정하기</DropdownMenu.Contents>
              <DropdownMenu.Contents href="" onClick={deleteModalOpen}>
                삭제하기
              </DropdownMenu.Contents>
            </DropdownMenu>
          </DotMenuOpener>
          {isDeleteModalVisible && (
            <MecaDeleteDialog cardId={cardId} visible={isDeleteModalVisible} onClose={deleteModalClose} />
          )}
        </>
      )}
    </MecaCardWrapper>
  );
};

export default MecaCard;
