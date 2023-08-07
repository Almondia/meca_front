import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProgressBar from '@/components/@common/molecules/ProgressBar';

export default {
  title: 'components/@common/molecules/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  backgroundColor: ['#98C0E1', '#20639B'],
  maxValue: 100,
  currentValue: 50,
  type: 'percentage',
};

export const FullWithDevision = Template.bind({});
FullWithDevision.args = {
  backgroundColor: ['#71D4B6', '#12B886'],
  maxValue: 100,
  currentValue: 100,
  type: 'devision',
};
