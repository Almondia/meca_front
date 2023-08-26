import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Toggle from '@/components/@common/atoms/Toggle';

export default {
  title: 'components/@common/atoms/Toggle',
  component: Toggle,
  parameters: {
    controls: {
      exclude: ['initialState'],
    },
  },
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = ({ initialState, onToggle, toggleName = 'toggle' }) => {
  const [toggle, setToggle] = useState<boolean>(initialState);
  const handleClick = () => {
    onToggle(!toggle);
    setToggle(!toggle);
  };
  return (
    <div>
      <Toggle initialState onToggle={handleClick} toggleName={toggleName} />
      {toggle ? 'on' : 'off'}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  initialState: true,
};
