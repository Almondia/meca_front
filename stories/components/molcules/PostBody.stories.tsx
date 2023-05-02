/* eslint-disable react/destructuring-assignment */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PostBody from '@/components/molcules/PostBody';

export default {
  title: 'components/molcules/PostBody',
  component: PostBody,
  parameters: {
    componentSubtitle: 'Post 컨텐츠 컴포넌트',
  },
} as ComponentMeta<typeof PostBody>;

const Template: ComponentStory<any> = (args: { title: React.ReactNode; content: React.ReactNode }) => (
  <div style={{ padding: '30px' }}>
    <PostBody>
      <PostBody.Title>{args.title}</PostBody.Title>
      <PostBody.Content>{args.content}</PostBody.Content>
    </PostBody>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'hello title',
  content: 'content content content content contentcontent contentcontent',
};
