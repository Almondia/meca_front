import { ComponentMeta, ComponentStory } from '@storybook/react';

import TimerBar, { TimerBarProps } from '@/components/molcules/TimerBar';

export default {
  title: 'components/molcules/TimerBar',
  component: TimerBar,
  parameters: {
    componentSubtitle: '퀴즈 타이머 바 컴포넌트',
  },
} as ComponentMeta<typeof TimerBar>;

const Template: ComponentStory<typeof TimerBar> = (args: TimerBarProps) => (
  <div style={{ padding: '30px' }}>
    <TimerBar {...args} />
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
