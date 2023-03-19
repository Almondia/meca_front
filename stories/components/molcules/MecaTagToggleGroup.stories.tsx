import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import MecaTagToggleGroup, { MecaTagToggleGroupProps } from '@/components/molcules/MecaTagToggleGroup';
import { MecaTagType } from '@/types/domain';

export default {
  title: 'components/molcules/MecaTagToggleGroup',
  component: MecaTagToggleGroup,
  parameters: {
    componentSubtitle: '메카태그 토글 버튼 그룹',
    controls: {
      exclude: ['options', 'selected', 'onToggle'],
    },
  },
} as ComponentMeta<typeof MecaTagToggleGroup>;

const Template: ComponentStory<typeof MecaTagToggleGroup> = (args: MecaTagToggleGroupProps) => {
  const options: MecaTagType[] = ['keyword', 'ox', 'select'];
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
