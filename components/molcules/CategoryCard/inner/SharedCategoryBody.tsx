import styled from 'styled-components';

import PostWriterInfo from '@/components/molcules/PostWriterInfo';
import { HiddenText } from '@/styles/common';
import { UserProfile } from '@/types/domain';

import { CategoryCardBodyContainer } from '../styled';

export type SharedCategoryBodyProps = Omit<UserProfile, 'email'>;

const WriterInfoBox = styled.div`
  transform: scale(0.8);
  margin-left: -30px;
  margin-bottom: 5px;
`;

const SharedCategoryBody = ({ memberId, name, profile }: SharedCategoryBodyProps) => (
  <CategoryCardBodyContainer>
    <WriterInfoBox>
      <PostWriterInfo name={name} profile={profile} />
    </WriterInfoBox>
    <HiddenText>{memberId}</HiddenText>
  </CategoryCardBodyContainer>
);

export const SharedCategoryBodyComponentType: typeof SharedCategoryBody extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never = SharedCategoryBody as any;

export default SharedCategoryBody;
