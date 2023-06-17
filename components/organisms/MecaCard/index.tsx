import dynamic from 'next/dynamic';

import React, { useMemo } from 'react';

import Card from '@/components/molcules/Card';
import CardMenu from '@/components/molcules/CardMenu';
import MecaTag from '@/components/molcules/MecaTag';
import useModal from '@/hooks/useModal';
import { MECA_TAG_TO_RESPONSE, MecaTagType, MecaType } from '@/types/domain';
import { extractFirstImageSrc } from '@/utils/imageHandler';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { combineUUID } from '@/utils/uuidHandler';

import { MecaQuestionTextContainer, MecaTagContainer } from './styled';

const MecaDeleteDialog = dynamic(() => import('@/components/organisms/MecaDeleteDialog'));

export interface MecaCardProps extends Omit<MecaType, 'answer' | 'cardType' | 'createdAt'> {
  tagType: MecaTagType;
  memberId: string;
  isMine?: boolean;
}

/** 문제 카드 컴포넌트 */
const MecaCard = ({
  cardId,
  categoryId,
  memberId,
  title,
  question,
  description,
  tagType,
  isMine,
  blurThumbnail,
}: MecaCardProps) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const thumbnailImageSrc = useMemo(
    () => blurThumbnail?.src ?? extractFirstImageSrc(description),
    [description, blurThumbnail],
  );
  return (
    <Card data-testid="id-meca-card">
      {thumbnailImageSrc && (
        <Card.Thumbnail
          src={thumbnailImageSrc}
          href={`/mecas/${combineUUID(memberId, cardId)}`}
          altText={`${title}-meca-thumbnail`}
          preloadedInfo={blurThumbnail}
        />
      )}
      <Card.Title link={`/mecas/${combineUUID(memberId, cardId)}`}>{title}</Card.Title>
      <Card.Body>
        <MecaQuestionTextContainer>
          {getQuestionAnswerByCardType({ question, cardType: MECA_TAG_TO_RESPONSE[tagType] }).question}
        </MecaQuestionTextContainer>
        <MecaTagContainer>
          <MecaTag tagName={tagType} />
        </MecaTagContainer>
        {isMine && (
          <>
            <CardMenu top="14px" right="6px" name={`${title}카드 수정 삭제 메뉴 오프너`}>
              <CardMenu.Dropdown>
                <CardMenu.Dropdown.Content href={`/mecas/write/${categoryId}?cardId=${cardId}`}>
                  수정하기
                </CardMenu.Dropdown.Content>
                <CardMenu.Dropdown.Content href="" onClick={deleteModalOpen}>
                  삭제하기
                </CardMenu.Dropdown.Content>
              </CardMenu.Dropdown>
            </CardMenu>
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

export default React.memo(MecaCard);
