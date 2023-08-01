import dynamic from 'next/dynamic';

import React from 'react';

import ProgressBar from '@/components/atoms/ProgressBar';
import BetweenControlGroup from '@/components/molcules/BetweenControlGroup';
import Card from '@/components/molcules/Card';
import DropdownMenu from '@/components/molcules/DropdownMenu';
import MecaTag from '@/components/molcules/MecaTag';
import PostSubInfo from '@/components/molcules/PostSubInfo';
import useModal from '@/hooks/useModal';
import { TextCaption } from '@/styles/common';
import { COLOR } from '@/styles/constants';
import { MECA_TAG_TO_RESPONSE, MecaStatisticsType, MecaTagType, MecaType } from '@/types/domain';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { combineUUID } from '@/utils/uuidHandler';

import { MecaQuestionTextContainer, ProgressesInfoContainer } from './styled';

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
        {!!tryCount && typeof scoreAvg === 'number' && (
          <ProgressesInfoContainer>
            <p>평균점수:</p>
            <ProgressBar
              maxValue={100}
              currentValue={scoreAvg}
              type="devision"
              backgroundColor={[COLOR.brand3, scoreAvg >= 50 ? COLOR.success : COLOR.error]}
            />
          </ProgressesInfoContainer>
        )}
        <BetweenControlGroup>
          {typeof tryCount === 'number' && (
            <BetweenControlGroup.Left>
              <PostSubInfo rowGutter="0.125rem" columnGutter="0.375rem">
                <PostSubInfo.Content title="풀린횟수:">
                  <TextCaption>
                    <strong>{tryCount}</strong> 회
                  </TextCaption>
                </PostSubInfo.Content>
              </PostSubInfo>
            </BetweenControlGroup.Left>
          )}
          <BetweenControlGroup.Right>
            <MecaTag tagName={tagType} />
          </BetweenControlGroup.Right>
        </BetweenControlGroup>
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
