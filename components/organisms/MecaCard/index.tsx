import dynamic from 'next/dynamic';

import React, { useCallback } from 'react';

import Card from '@/components/molcules/Card';
import DropdownMenu from '@/components/molcules/DropdownMenu';
import MecaTag from '@/components/molcules/MecaTag';
import useModal from '@/hooks/useModal';
import { TextCaption } from '@/styles/common';
import { MECA_TAG_TO_RESPONSE, MecaStatisticsType, MecaTagType, MecaType } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { combineUUID } from '@/utils/uuidHandler';

import { MecaQuestionTextContainer, MecaSubInfoContainer, MecaSubInfoStrongText } from './styled';

const MecaDeleteDialog = dynamic(() => import('@/components/organisms/MecaDeleteDialog'));

export interface MecaCardProps
  extends Omit<MecaType, 'answer' | 'cardType' | 'createdAt' | 'description'>,
    Partial<MecaStatisticsType> {
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
  tagType,
  isMine,
  thumbnail,
  blurThumbnail,
  scoreAvg,
  tryCount,
}: MecaCardProps) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const getScoreColor = useCallback((score: number) => {
    if (score >= 70) {
      return 'var(--color-success)';
    }
    if (score < 40) {
      return 'var(--color-error)';
    }
    return 'var(--color-text)';
  }, []);
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
                <MecaSubInfoStrongText>{tryCount}</MecaSubInfoStrongText>회 풀이&nbsp;
              </span>
            )}
            {!!tryCount && typeof scoreAvg === 'number' && (
              <span data-testid="id-meca-score">
                <MecaSubInfoStrongText>·</MecaSubInfoStrongText> 평균&nbsp;
                <MecaSubInfoStrongText color={getScoreColor(scoreAvg)}>{scoreAvg.toFixed(0)}</MecaSubInfoStrongText>점
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
};

export default React.memo(MecaCard);
