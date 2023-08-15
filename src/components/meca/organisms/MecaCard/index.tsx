import { memo } from 'react';

import type { MecaListContent } from '@/types/domain/meca';

import Card from '@/components/@common/molecules/Card';
import IconTag from '@/components/@common/molecules/IconTag';
import MecaCardUpdateMenu from '@/components/meca/molecules/MecaCardUpdateMenu';
import MecaStatisticText from '@/components/meca/molecules/MecaStatisticsText';
import MecaDeleteDialog from '@/components/meca/organisms/MecaDeleteDialog';
import { MECA_TAGS } from '@/utils/constants';
import { getQuestionAnswerByCardType } from '@/utils/questionAnswerHandler';
import { combineUUID } from '@/utils/uuidHandler';

import * as ST from './styled';

export interface MecaCardProps extends MecaListContent {
  isMine?: boolean;
}

const MecaCard = memo(({ card, statistics, isMine }: MecaCardProps) => {
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
        <ST.BodyMain>{getQuestionAnswerByCardType({ question, cardType }).question}</ST.BodyMain>
        <ST.BodySub>
          <MecaStatisticText {...statistics} />
          <IconTag {...MECA_TAGS[cardType]} />
        </ST.BodySub>
        {isMine && (
          <ST.PrivateMenu>
            <MecaCardUpdateMenu
              title={title}
              updateLinkUrl={`/mecas/write/${categoryId}?cardId=${cardId}`}
              deleteModalComponent={(props) => MecaDeleteDialog({ ...props, cardId, categoryId, cardTitle: title })}
            />
          </ST.PrivateMenu>
        )}
      </Card.Body>
    </Card>
  );
});

export default MecaCard;
