import { ComponentMeta, ComponentStory } from '@storybook/react';

import NumberIncrementer from '@/components/@common/molecules/NumberIncrementer';
import useIncrease from '@/hooks/useCount';

export default {
  title: 'components/@common/molecules/NumberIncrementer',
  component: NumberIncrementer,
  parameters: {
    componentSubtitle: '숫자 증감 토글',
  },
} as ComponentMeta<typeof NumberIncrementer>;

const Template: ComponentStory<typeof NumberIncrementer> = () => {
  const { number, increaseNumber } = useIncrease(5, 0, 10);
  return <NumberIncrementer value={number} onChange={increaseNumber} />;
};

export const Default = Template.bind({});
