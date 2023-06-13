/* eslint-disable no-alert */
import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import ToggleButton, { ToggleButtonProps } from '@/components/atoms/ToggleButton';

export default {
  title: 'components/atoms/ToggleButton',
  component: ToggleButton,
  parameters: {
    componentSubtitle: '토글 버튼',
  },
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = <T extends number>(args: ToggleButtonProps<T>) => (
  <div style={{ padding: '30px' }}>
    <ToggleButton {...args} />
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
