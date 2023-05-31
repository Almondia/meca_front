import { PostBodyContainer, PostBodyContentWrapper, PostBodyTitleWrapper, PostBodyWrapper } from './styled';

const PostBodyTitle = ({ children }: { children: React.ReactNode }) => (
  <PostBodyTitleWrapper>{children}</PostBodyTitleWrapper>
);

export interface PostBodyContentProps {
  children: React.ReactNode;
  hasBackground?: boolean;
  hasIndent?: boolean;
}

const PostBodyContent = ({ children, hasBackground = true, hasIndent = true }: PostBodyContentProps) => (
  <PostBodyContentWrapper hasBackground={hasBackground} hasIndent={hasIndent}>
    {children}
  </PostBodyContentWrapper>
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
