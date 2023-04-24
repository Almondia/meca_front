import PostWriterInfo from '@/components/molcules/PostWriterInfo';
import { HiddenText } from '@/styles/common';
import { UserProfile } from '@/types/domain';

import { CategoryCardBodyContainer, CategoryCardInfoBox } from '../styled';

export type SharedCategoryBodyProps = Omit<UserProfile, 'email'>;

const SharedCategoryBody = ({ memberId, name, profile }: SharedCategoryBodyProps) => (
  <CategoryCardBodyContainer>
    <CategoryCardInfoBox>
      <PostWriterInfo name={name} profile={profile} />
    </CategoryCardInfoBox>
    <HiddenText>{memberId}</HiddenText>
  </CategoryCardBodyContainer>
);

export const SharedCategoryBodyComponentType: typeof SharedCategoryBody extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = SharedCategoryBody as any;

export default SharedCategoryBody;
