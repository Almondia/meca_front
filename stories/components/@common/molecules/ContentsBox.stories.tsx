import { ComponentMeta, ComponentStory } from '@storybook/react';

import ContentsBox from '@/components/@common/molecules/ContentsBox';

export default {
  title: 'components/@common/molecules/ContentsBox',
  component: ContentsBox,
  parameters: {
    componentSubtitle: '컨텐츠 박스 컴포넌트',
  },
} as ComponentMeta<typeof ContentsBox>;

const Template: ComponentStory<typeof ContentsBox> = (args) => (
  <div style={{ padding: '30px' }}>
    <ContentsBox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  header: 'Q.',
  body: '제 2 정규형에서 제 3정규형이 되기 위한 조건은 무엇일까요?',
};
