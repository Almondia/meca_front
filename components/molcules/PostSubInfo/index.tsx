import { TextCaption } from '@/styles/common';
import { ElementSizeType } from '@/types/common';

import { PostSubInfoContentWrapper, PostSubInfoWrapper } from './styled';

const PostSubInfoContent = ({ title, children }: { title: React.ReactNode; children: React.ReactNode }) => (
  <PostSubInfoContentWrapper>
    <TextCaption>{title}</TextCaption>
    {children}
  </PostSubInfoContentWrapper>
);

export interface PostSubInfoProps {
  children: React.ReactNode;
  rowGutter?: ElementSizeType;
  columnGutter?: ElementSizeType;
}

/**
 *
 * @param children: PostSubInfoContent
 * @example <PostSubInfo.Content />
 * @returns
 */
const PostSubInfo = ({ children, rowGutter = '16px', columnGutter = '40px' }: PostSubInfoProps) => (
  <PostSubInfoWrapper rowGutter={rowGutter} columnGutter={columnGutter}>
    {children}
  </PostSubInfoWrapper>
);

PostSubInfo.Content = PostSubInfoContent;

export default PostSubInfo;
