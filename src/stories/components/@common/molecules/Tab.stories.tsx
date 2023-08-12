/* eslint-disable no-alert */
import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Tab from '@/components/@common/molecules/Tab';

export default {
  title: 'components/@common/molecules/Tab',
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

export const Default = () => {
  const values = [30, 60, 90];
  const [currentValue, setCurrentValue] = useState<number>(values[0]);
  return (
    <>
      <Template tabButtonProps={values.map((v) => ({ name: v.toString(), onClick: () => setCurrentValue(v) }))} />
      <p>selected value:{currentValue} </p>
    </>
  );
};
