import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import type { MecaTag } from '@/types/domain/meca';

import MecaTagToggleGroup from '@/components/meca/molecules/MecaTagToggleGroup';
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
  const options = Object.keys(MECA_TAGS) as MecaTag[];
  const [selected, setSelected] = useState<MecaTag>('KEYWORD');
  const onToggle = (value: MecaTag) => {
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
