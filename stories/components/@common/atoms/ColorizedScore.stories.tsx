import { ComponentMeta, ComponentStory } from '@storybook/react';

import ColorizedScore from '@/components/@common/atoms/ColorizedScore';

export default {
  title: 'components/@common/atoms/ColorizedScore',
  component: ColorizedScore,
  parameters: {
    componentSubtitle: '스코어 강조 텍스트 컴포넌트',
  },
} as ComponentMeta<typeof ColorizedScore>;

const Template: ComponentStory<typeof ColorizedScore> = (args) => <ColorizedScore {...args} />;

export const Default = Template.bind({});
Default.args = {
  fixedValue: 1,
  score: 75,
  minimumIdealScore: 70,
  maximumBadScore: 40,
};
