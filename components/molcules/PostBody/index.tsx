import { sahitya } from '@/styles/font';

import { PostBodyContainer, PostBodyContentWrapper, PostBodyTitleWrapper, PostBodyWrapper } from './styled';

const PostBodyTitle = ({ children }: { children: React.ReactNode }) => (
  <PostBodyTitleWrapper className={sahitya.className}>{children}</PostBodyTitleWrapper>
);

const PostBodyContent = ({ children }: { children: React.ReactNode }) => (
  <PostBodyContentWrapper>{children}</PostBodyContentWrapper>
);

/**
 *
 * @param children: PostBodyTitle, PostBodyContent
 * @example <PostBody.Title/> <PostBody.Content/>
 * @returns
 */
const PostBody = ({ children }: { children: React.ReactNode }) => (
  <PostBodyWrapper>
    <PostBodyContainer>{children}</PostBodyContainer>
  </PostBodyWrapper>
);

PostBody.Title = PostBodyTitle;
PostBody.Content = PostBodyContent;

export default PostBody;
