import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizCounter, { QuizCounterProps } from '@/components/atoms/QuizCounter';

export default {
  title: 'components/atoms/QuizCounter',
  component: QuizCounter,
  parameters: {
    componentSubtitle: '퀴즈 카운트 컴포넌트',
  },
} as ComponentMeta<typeof QuizCounter>;

const Template: ComponentStory<typeof QuizCounter> = (args: QuizCounterProps) => (
  <div style={{ padding: '30px' }}>
    <QuizCounter {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  currentCount: 4,
  maxCount: 20,
};
