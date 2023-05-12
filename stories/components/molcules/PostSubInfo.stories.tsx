import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaTag from '@/components/molcules/MecaTag';
import PostSubInfo from '@/components/molcules/PostSubInfo';
import { TextCaption } from '@/styles/common';

export default {
  title: 'components/molcules/PostSubInfo',
  component: PostSubInfo,
  parameters: {
    componentSubtitle: 'Post 부가정보 컴포넌트',
  },
} as ComponentMeta<typeof PostSubInfo>;

const Template: ComponentStory<any> = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '30px' }}>
    <PostSubInfo>{children}</PostSubInfo>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <PostSubInfo.Content title="작성일">
        <TextCaption>4시간 전</TextCaption>
      </PostSubInfo.Content>
      <PostSubInfo.Content title="문제유형">
        <MecaTag tagName="keyword" scale={0.8} />
      </PostSubInfo.Content>
    </>
  ),
};
