import { ComponentMeta, ComponentStory } from '@storybook/react';

import TimerBar from '@/components/@common/molecules/TimerBar';

export default {
  title: 'components/@common/molecules/TimerBar',
  component: TimerBar,
} as ComponentMeta<typeof TimerBar>;

const Template: ComponentStory<typeof TimerBar> = (args) => <TimerBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  second: 6,
};

export const Disabled = Template.bind({});
Disabled.args = {
  second: undefined,
};
