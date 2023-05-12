import dynamic from 'next/dynamic';

import MecaTag from '@/components/atoms/MecaTag';
import Card from '@/components/molcules/Card';
import DotMenuOpener from '@/components/molcules/DotMenuOpener';
import DropdownMenu from '@/components/molcules/DropdownMenu';
import useModal from '@/hooks/useModal';
import { MecaTagType } from '@/types/domain';
import { extractFirstImageSrc } from '@/utils/imageHandler';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';
import { combineUUID } from '@/utils/uuidHandler';

import { MecaQuestionTextContainer, MecaTagContainer } from './styled';

const MecaDeleteDialog = dynamic(() => import('@/components/organisms/MecaDeleteDialog'));

export interface MecaCardProps {
  cardId: string;
  categoryId: string;
  title: string;
  question: string;
  description: string;
  tagType: MecaTagType;
  memberId: string;
  /** 다른 사용자의 카테고리에 대한 카드와 내 것에 차이가 있음 */
  isMine?: boolean;
}

/** 문제 카드 컴포넌트 */
const MecaCard = ({ cardId, categoryId, memberId, title, question, description, tagType, isMine }: MecaCardProps) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const thumbnailImageSrc = extractFirstImageSrc(description);
  return (
    <Card data-testid="id-meca-card">
      {thumbnailImageSrc && (
        <Card.Thumbnail
          src={thumbnailImageSrc}
          href={`/mecas/${combineUUID(memberId, cardId)}`}
          altText={`${title}-meca-thumbnail`}
        />
      )}
      <Card.Title link={`/mecas/${combineUUID(memberId, cardId)}`}>{title}</Card.Title>
      <Card.Body>
        <MecaQuestionTextContainer>
          {tagType === 'select' ? stringToJsonStringArrayConverter(question)[0] : question}
        </MecaQuestionTextContainer>
        <MecaTagContainer>
          <MecaTag tagName={tagType} />
        </MecaTagContainer>
        {isMine && (
          <>
            <DotMenuOpener top="14px" right="6px" name={`${title}카드 수정 삭제 메뉴 오프너`}>
              <DropdownMenu>
                <DropdownMenu.Contents href={`/mecas/write/${categoryId}?cardId=${cardId}`}>
                  수정하기
                </DropdownMenu.Contents>
                <DropdownMenu.Contents href="" onClick={deleteModalOpen}>
                  삭제하기
                </DropdownMenu.Contents>
              </DropdownMenu>
            </DotMenuOpener>
            {isDeleteModalVisible && (
              <MecaDeleteDialog
                cardId={cardId}
                categoryId={categoryId}
                cardTitle={title}
                visible={isDeleteModalVisible}
                onClose={deleteModalClose}
              />
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default MecaCard;
