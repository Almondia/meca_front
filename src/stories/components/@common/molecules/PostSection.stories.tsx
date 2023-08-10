/* eslint-disable react/destructuring-assignment */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import PostSection from '@/components/@common/molecules/PostSection';

export default {
  title: 'components/@common/molecules/PostSection',
  component: PostSection,
  parameters: {
    componentSubtitle: 'Post 컨텐츠 컴포넌트',
  },
} as ComponentMeta<any>;

const Template: ComponentStory<any> = (args: { title: React.ReactNode; content: React.ReactNode }) => (
  <PostSection>
    <PostSection.Title>{args.title}</PostSection.Title>
    <PostSection.Body indented={false} boxed={false}>
      {args.content}
    </PostSection.Body>
  </PostSection>
);

export const Default = Template.bind({});
Default.args = {
  title: 'hello title',
  content: 'content content content content contentcontent contentcontent',
};

export const IndentedWithBoxed = () => (
  <PostSection>
    <PostSection.Title>hello title</PostSection.Title>
    <PostSection.Body indented boxed>
      content content content content contentcontent contentcontent
    </PostSection.Body>
  </PostSection>
);
