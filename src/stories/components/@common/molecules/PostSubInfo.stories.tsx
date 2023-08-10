import { ComponentMeta, ComponentStory } from '@storybook/react';

import PostSubInfo from '@/components/@common/molecules/PostSubInfo';
import { TextCaption } from '@/styles/common';

export default {
  title: 'components/@common/molecules/PostSubInfo',
  component: PostSubInfo,
  parameters: {
    componentSubtitle: 'Post 부가정보 컴포넌트',
  },
} as ComponentMeta<typeof PostSubInfo>;

const Template: ComponentStory<typeof PostSubInfo> = ({ columnGutter, rowGutter }) => (
  <PostSubInfo columnGutter={columnGutter} rowGutter={rowGutter}>
    <PostSubInfo.Content title="작성일">
      <TextCaption>4시간 전</TextCaption>
    </PostSubInfo.Content>
    <PostSubInfo.Content title="작성자">
      <TextCaption>박동석</TextCaption>
    </PostSubInfo.Content>
  </PostSubInfo>
);

export const Default = Template.bind({});
Default.args = {
  rowGutter: '16px',
  columnGutter: '40px',
};
