import { ComponentMeta, ComponentStory } from '@storybook/react';

import PostWriterInfo, { PostWriterInfoProps } from '@/components/molcules/PostWriterInfo';

export default {
  title: 'components/molcules/PostWriterInfo',
  component: PostWriterInfo,
  parameters: {
    componentSubtitle: '카드 작성자 정보 컴포넌트',
  },
} as ComponentMeta<typeof PostWriterInfo>;

const Template: ComponentStory<typeof PostWriterInfo> = (args: PostWriterInfoProps) => (
  <div style={{ padding: '30px' }}>
    <PostWriterInfo {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  name: '사용자 이름',
};
