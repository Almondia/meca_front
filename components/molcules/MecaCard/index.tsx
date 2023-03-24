import CardTitle from '@/components/atoms/CardTitle';
import DropdownMenu from '@/components/atoms/DropdownMenu';
import MecaTag from '@/components/atoms/MecaTag';
import { MecaTagType } from '@/types/domain';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

import { MecaCardWrapper, MecaQuestionTextContainer, MecaTagContainer } from './styled';

import DotMenuOpener from '../DotMenuOpener';

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
const MecaCard = ({ cardId, categoryId, title, question, tagType, isMine }: MecaCardProps) => (
  <MecaCardWrapper data-testid="id-meca-card">
    <CardTitle link={isMine ? `/meca/${cardId}?me=${isMine}` : `/meca/${cardId}`}>{title}</CardTitle>
    <MecaQuestionTextContainer>
      {tagType === 'select' ? stringToJsonStringArrayConverter(question)[0] : question}
    </MecaQuestionTextContainer>
    <MecaTagContainer>
      <MecaTag tagName={tagType} />
    </MecaTagContainer>
    {isMine && (
      <DotMenuOpener top="14px" right="14px">
        <DropdownMenu>
          <DropdownMenu.Contents href={`/meca/write/${categoryId}?cardId=${cardId}`}>수정하기</DropdownMenu.Contents>
          <DropdownMenu.Contents href="" onClick={() => alert('삭제')}>
            삭제하기
          </DropdownMenu.Contents>
        </DropdownMenu>
      </DotMenuOpener>
    )}
  </MecaCardWrapper>
);

export default MecaCard;
