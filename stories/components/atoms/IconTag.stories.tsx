import { ComponentMeta, ComponentStory } from '@storybook/react';

import IconTag, { IconTagProps } from '@/components/atoms/IconTag';

export default {
  title: 'components/atoms/IconTag',
  component: IconTag,
  parameters: {
    componentSubtitle: '아이콘 태그',
  },
} as ComponentMeta<typeof IconTag>;

const Template: ComponentStory<typeof IconTag> = (args: IconTagProps) => (
  <div style={{ maxWidth: '360px' }}>
    <IconTag {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  icon: 'Lightmode',
  text: '햇빛',
};

export const Lock = Template.bind({});
Lock.args = {
  icon: 'Lock',
  text: '비공개',
  tagColor: 'black',
  textColor: 'white',
};
