import { ComponentMeta, ComponentStory } from '@storybook/react';

import CountIndicator from '@/components/@common/atoms/CountIndicator';

export default {
  title: 'components/@common/atoms/CountIndicator',
  component: CountIndicator,
  parameters: {
    componentSubtitle: '현재/최대 카운트 컴포넌트',
  },
} as ComponentMeta<typeof CountIndicator>;

const Template: ComponentStory<typeof CountIndicator> = (args) => <CountIndicator {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentCount: 4,
  maxCount: 20,
};
