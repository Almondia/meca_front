import Icon from '@/components/@common/atoms/Icon';
import AvatarUser from '@/components/@common/molecules/AvatarUser';
import { HiddenText, TextOverline } from '@/styles/common';
import { UserProfile } from '@/types/domain';

import { CategoryCardBodyContainer, CategoryCardInfoBox } from '../styled';

export interface SharedCategoryBodyProps extends Omit<UserProfile, 'email'> {
  likeCount: number;
}

const SharedCategoryBody = ({ memberId, name, profile, likeCount }: SharedCategoryBodyProps) => (
  <CategoryCardBodyContainer>
    <CategoryCardInfoBox>
      <AvatarUser name={name} profile={profile} />
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
