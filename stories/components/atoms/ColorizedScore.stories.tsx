import { ComponentMeta, ComponentStory } from '@storybook/react';

import ColorizedScore, { ColorizedScoreProps } from '@/components/atoms/ColorizedScore';

export default {
  title: 'components/atoms/ColorizedScore',
  component: ColorizedScore,
  parameters: {
    componentSubtitle: '스코어 강조 텍스트 컴포넌트',
  },
} as ComponentMeta<typeof ColorizedScore>;

const Template: ComponentStory<typeof ColorizedScore> = (args: ColorizedScoreProps) => <ColorizedScore {...args} />;

export const Default = Template.bind({});
Default.args = {
  fixedValue: 1,
  score: 75,
  minimumIdealScore: 70,
  maximumBadScore: 40,
};
