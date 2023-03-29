/* eslint-disable no-alert */
import Link from 'next/link';

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

export const WithModification = Template.bind({});
WithModification.args = {
  name: '사용자 이름',
  children: (
    <PostWriterInfo.Modification>
      <Link href="/">수정하기</Link>
      <Link href="/">삭제하기</Link>
    </PostWriterInfo.Modification>
  ),
};
