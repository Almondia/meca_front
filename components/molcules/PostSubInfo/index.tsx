import { TextCaption } from '@/styles/common';

import { PostSubInfoContentWrapper, PostSubInfoWrapper } from './styled';

const PostSubInfoContent = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <PostSubInfoContentWrapper>
    <TextCaption>{title}</TextCaption>
    {children}
  </PostSubInfoContentWrapper>
);

/**
 *
 * @param children: PostSubInfoContent
 * @example <PostSubInfo.Content />
 * @returns
 */
const PostSubInfo = ({ children }: { children: React.ReactNode }) => (
  <PostSubInfoWrapper>{children}</PostSubInfoWrapper>
);

PostSubInfo.Content = PostSubInfoContent;

export default PostSubInfo;
