import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizBox, { QuizBoxProps } from '@/components/atoms/QuizBox';

export default {
  title: 'components/atoms/QuizBox',
  component: QuizBox,
  parameters: {
    componentSubtitle: '퀴즈 풀이 컨텐츠 박스 컴포넌트',
  },
} as ComponentMeta<typeof QuizBox>;

const Template: ComponentStory<typeof QuizBox> = (args: QuizBoxProps) => (
  <div style={{ padding: '30px' }}>
    <QuizBox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  header: 'Q.',
  body: '제 2 정규형에서 제 3정규형이 되기 위한 조건은 무엇일까요?',
};
