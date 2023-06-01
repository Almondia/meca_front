import Icon from '@/components/common/Icon';
import PostWriterInfo from '@/components/molcules/PostWriterInfo';
import { HiddenText, TextOverline } from '@/styles/common';
import { UserProfile } from '@/types/domain';

import { CategoryCardBodyContainer, CategoryCardInfoBox } from '../styled';

export interface SharedCategoryBodyProps extends Omit<UserProfile, 'email'> {
  likeCount: number;
}

const SharedCategoryBody = ({ memberId, name, profile, likeCount }: SharedCategoryBodyProps) => (
  <CategoryCardBodyContainer>
    <CategoryCardInfoBox>
      <PostWriterInfo name={name} profile={profile} />
    </CategoryCardInfoBox>
    <div>
      <Icon icon="Like" size="1rem" />
      <TextOverline style={{ textAlign: 'center' }}>{likeCount}</TextOverline>
    </div>
    <HiddenText>{memberId}</HiddenText>
  </CategoryCardBodyContainer>
);

export const SharedCategoryBodyComponentType: typeof SharedCategoryBody extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = SharedCategoryBody as any;

export default SharedCategoryBody;
