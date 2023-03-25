import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaPostContent, { MecaPostContentProps } from '@/components/molcules/MecaPostContent';

export default {
  title: 'components/molcules/MecaPostContent',
  component: MecaPostContent,
  parameters: {
    componentSubtitle: '메모리 카드 콘텐츠',
  },
} as ComponentMeta<typeof MecaPostContent>;

const Template: ComponentStory<typeof MecaPostContent> = (args: MecaPostContentProps) => (
  <div style={{ padding: '30px' }}>
    <MecaPostContent {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  content: '내용내용내용 내용내용내용내용내용내용내용내용내용 내용내용내용',
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  content: '내용내용내용 내용내용내용내용내용내용내용내용내용 내용내용내용',
};
