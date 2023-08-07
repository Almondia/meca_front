import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaTagToggleGroup from '@/components/meca/molecules/MecaTagToggleGroup';
import { MecaTagType } from '@/types/domain';

export default {
  title: 'components/meca/MecaTagToggleGroup',
  component: MecaTagToggleGroup,
  parameters: {
    controls: {
      exclude: ['options', 'selected', 'onToggle'],
    },
  },
} as ComponentMeta<typeof MecaTagToggleGroup>;

const Template: ComponentStory<typeof MecaTagToggleGroup> = (args) => {
  const options: MecaTagType[] = ['ox', 'keyword', 'select', 'desc'];
  const [selected, setSelected] = useState<MecaTagType>('keyword');
  const onToggle = (value: MecaTagType) => {
    setSelected(value);
  };
  return (
    <>
      <MecaTagToggleGroup {...args} options={options} selected={selected} onToggle={onToggle} />
      <br />
      selected value: {selected}
    </>
  );
};

export const Default = Template.bind({});

export const OnlySelected = Template.bind({});
OnlySelected.args = {
  onlySelected: true,
};
