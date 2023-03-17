import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import MecaTagToggleGroup from '@/components/molcules/MecaTagToggleGroup';
import { MecaTagType } from '@/types/domain';

export default {
  title: 'components/molcules/MecaTagToggleGroup',
  component: MecaTagToggleGroup,
  parameters: {
    componentSubtitle: '메카태그 토글 버튼 그룹',
  },
} as ComponentMeta<typeof MecaTagToggleGroup>;

const Template: ComponentStory<typeof MecaTagToggleGroup> = () => {
  const options: MecaTagType[] = ['desc', 'keyword', 'ox', 'select'];
  const [selected, setSelected] = useState<MecaTagType>('desc');
  const onToggle = (value: MecaTagType) => {
    setSelected(value);
  };
  return (
    <>
      <MecaTagToggleGroup options={options} selected={selected} onToggle={onToggle} />
      <br />
      selected value: {selected}
    </>
  );
};

export const Default = Template.bind({});
