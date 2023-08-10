import SectionBody from '@/components/@common/atoms/SectionBody';
import SectionTitle from '@/components/@common/atoms/SectionTitle';

import { PostSectionInnerContainer, PostSectionWrapper } from './styled';

const PostSection = ({ children }: { children: React.ReactNode }) => (
  <PostSectionWrapper>
    <PostSectionInnerContainer>{children}</PostSectionInnerContainer>
  </PostSectionWrapper>
);

PostSection.Title = SectionTitle;
PostSection.Body = SectionBody;

export default PostSection;
