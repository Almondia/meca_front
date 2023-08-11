import dynamic from 'next/dynamic';

import { memo } from 'react';

import type { MecaListContent } from '@/types/domain/meca';

import Card from '@/components/@common/molecules/Card';
import DropdownMenu from '@/components/@common/molecules/DropdownMenu';
import IconTag from '@/components/@common/molecules/IconTag';
import MecaStatisticText from '@/components/meca/molecules/MecaStatisticsText';
import useModal from '@/hooks/useModal';
import { MECA_TAGS } from '@/utils/constants';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { combineUUID } from '@/utils/uuidHandler';

import * as StyledMecaCard from './styled';

const MecaDeleteDialog = dynamic(() => import('@/components/meca/organisms/MecaDeleteDialog'), { ssr: false });

export interface MecaCardProps extends MecaListContent {
  isMine?: boolean;
}

const MecaCard = memo(({ card, statistics, isMine }: MecaCardProps) => {
  const { visible: isDeleteModalVisible, open: deleteModalOpen, close: deleteModalClose } = useModal();
  const { cardId, memberId, categoryId, title, question, cardType, thumbnail, blurThumbnail } = card;
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
        <StyledMecaCard.BodyMain>
          {getQuestionAnswerByCardType({ question, cardType }).question}
        </StyledMecaCard.BodyMain>
        <StyledMecaCard.BodySub>
          <MecaStatisticText {...statistics} />
          <IconTag {...MECA_TAGS[cardType]} />
        </StyledMecaCard.BodySub>
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
});

export default MecaCard;
