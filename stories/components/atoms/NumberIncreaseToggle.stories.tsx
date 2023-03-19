import { ComponentMeta, ComponentStory } from '@storybook/react';

import NumberIncreaseToggle from '@/components/atoms/NumberIncreaseToggle';
import useIncrease from '@/hooks/useCount';

export default {
  title: 'components/atoms/NumberIncreaseToggle',
  component: NumberIncreaseToggle,
  parameters: {
    componentSubtitle: '숫자 증감 토글',
  },
} as ComponentMeta<typeof NumberIncreaseToggle>;

const Template: ComponentStory<typeof NumberIncreaseToggle> = () => {
  const { number, increaseNumber } = useIncrease(5, 0, 10);
  return <NumberIncreaseToggle value={number} onChange={increaseNumber} />;
};

export const Default = Template.bind({});
