import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaTagToggleGroup from '@/components/meca/molecules/MecaTagToggleGroup';
import { MecaTagType } from '@/types/domain';
import { MECA_TAGS } from '@/utils/constants';

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
  const options = Object.keys(MECA_TAGS) as MecaTagType[];
  const [selected, setSelected] = useState<MecaTagType>('KEYWORD');
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
