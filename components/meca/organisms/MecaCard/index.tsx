import dynamic from 'next/dynamic';

import { memo } from 'react';

import ColorizedScore from '@/components/@common/atoms/ColorizedScore';
import Card from '@/components/@common/molecules/Card';
import DropdownMenu from '@/components/@common/molecules/DropdownMenu';
import MecaTag from '@/components/meca/molecules/MecaTag';
import useModal from '@/hooks/useModal';
import { TextCaption } from '@/styles/common';
import { MECA_TAG_TO_RESPONSE, MecaStatisticsType, MecaTagType, MecaType } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { combineUUID } from '@/utils/uuidHandler';

import { MecaQuestionTextContainer, MecaSubInfoContainer } from './styled';

const MecaDeleteDialog = dynamic(() => import('@/components/meca/organisms/MecaDeleteDialog'), { ssr: false });

export interface MecaCardProps
  extends Omit<MecaType, 'answer' | 'cardType' | 'createdAt' | 'description'>,
    Partial<MecaStatisticsType> {
  tagType: MecaTagType;
  memberId: string;
  isMine?: boolean;
}

/** 문제 카드 컴포넌트 */
const MecaCard = memo(
  ({
    cardId,
    categoryId,
    memberId,
    title,
    question,
    tagType,
    isMine,
    thumbnail,
    blurThumbnail,
    scoreAvg,
    tryCount,
  }: MecaCardProps) => {
    const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
    return (
      <Card data-testid="id-meca-card">
        {thumbnail && (
          <Card.Thumbnail
            src={thumbnail}
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
          <MecaSubInfoContainer>
            <TextCaption>
              {typeof tryCount === 'number' && (
                <span data-testid="id-meca-count">
                  <strong>{tryCount}</strong>회 풀이&nbsp;
                </span>
              )}
              {!!tryCount && typeof scoreAvg === 'number' && (
                <span data-testid="id-meca-score">
                  <strong>·</strong> 평균&nbsp;
                  <ColorizedScore score={scoreAvg} size="caption" />점
                </span>
              )}
            </TextCaption>
            <MecaTag tagName={tagType} />
          </MecaSubInfoContainer>
          {isMine && (
            <>
              <DropdownMenu scale={0.7} top="14px" right="6px" name={`${title}카드 수정 삭제 메뉴 오프너`}>
                <DropdownMenu.Menu href={`/mecas/write/${categoryId}?cardId=${cardId}`}>수정하기</DropdownMenu.Menu>
                <DropdownMenu.Menu onClick={deleteModalOpen}>삭제하기</DropdownMenu.Menu>
              </DropdownMenu>
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
  },
);

export default MecaCard;
