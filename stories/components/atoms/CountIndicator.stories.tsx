import { ComponentMeta, ComponentStory } from '@storybook/react';

import CountIndicator, { CountIndicatorProps } from '@/components/atoms/CountIndicator';

export default {
  title: 'components/atoms/CountIndicator',
  component: CountIndicator,
  parameters: {
    componentSubtitle: '현재/최대 카운트 컴포넌트',
  },
} as ComponentMeta<typeof CountIndicator>;

const Template: ComponentStory<typeof CountIndicator> = (args: CountIndicatorProps) => (
  <div style={{ padding: '30px' }}>
    <CountIndicator {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  currentCount: 4,
  maxCount: 20,
};
