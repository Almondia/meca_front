/* eslint-disable react/destructuring-assignment */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PostBody from '@/components/@common/molecules/PostBody';

export default {
  title: 'components/@common/molecules/PostBody',
  component: PostBody,
  parameters: {
    componentSubtitle: 'Post 컨텐츠 컴포넌트',
  },
} as ComponentMeta<any>;

const Template: ComponentStory<any> = (args: {
  title: React.ReactNode;
  content: React.ReactNode;
  hasIndent: boolean;
}) => (
  <PostBody>
    <PostBody.Title>{args.title}</PostBody.Title>
    <PostBody.Content hasIndent={args.hasIndent}>{args.content}</PostBody.Content>
  </PostBody>
);

export const Default = Template.bind({});
Default.args = {
  title: 'hello title',
  content: 'content content content content contentcontent contentcontent',
};

export const WithNoBgNoPad = () => (
  <PostBody>
    <PostBody.Title>TItle</PostBody.Title>
    <PostBody.Content hasBackground={false} hasIndent={false}>
      content content content content contentcontent contentcontent
    </PostBody.Content>
  </PostBody>
);
