import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizTimer, { QuizTimerProps } from '@/components/atoms/QuizTimer';

export default {
  title: 'components/atoms/QuizTimer',
  component: QuizTimer,
  parameters: {
    componentSubtitle: '퀴즈 타이머 바 컴포넌트',
  },
} as ComponentMeta<typeof QuizTimer>;

const Template: ComponentStory<typeof QuizTimer> = (args: QuizTimerProps) => (
  <div style={{ padding: '30px' }}>
    <QuizTimer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  second: 6,
};

export const Disabled = Template.bind({});
Disabled.args = {
  second: undefined,
};
