/* eslint-disable no-alert */
import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Selection from '@/components/@common/molecules/Selection';

export default {
  title: 'components/@common/molecules/Selection',
  component: Selection,
} as ComponentMeta<typeof Selection>;

const Template: ComponentStory<typeof Selection> = (args) => (
  <div style={{ padding: '30px' }}>
    <Selection {...args} />
  </div>
);

export const Default = () => {
  const values = ['30', '60', '90'];
  const [currentValue, setCurrentValue] = useState<string>(values[0]);
  return (
    <>
      <Template innerTexts={[...values]} onClicks={values.map((v) => () => setCurrentValue(v))} />
      <p>selected value:{currentValue} </p>
    </>
  );
};
