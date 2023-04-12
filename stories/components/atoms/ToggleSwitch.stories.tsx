import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import ToggleSwitch from '@/components/atoms/ToggleSwitch';

export default {
  title: 'components/atoms/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    componentSubtitle: '토글 스위치 ',
  },
} as ComponentMeta<typeof ToggleSwitch>;

const Template: ComponentStory<typeof ToggleSwitch> = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleClick = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div style={{ padding: '30px' }}>
      <ToggleSwitch initialState={false} onClick={handleClick} toggleName="toggle" />
      {toggle ? 'off' : 'on'}
    </div>
  );
};

export const Default = Template.bind({});
