import { ComponentMeta, ComponentStory } from '@storybook/react';

import IconTag from '@/components/@common/molecules/IconTag';

export default {
  title: 'components/@common/molecules/IconTag',
  component: IconTag,
  parameters: {
    componentSubtitle: '아이콘 태그',
  },
} as ComponentMeta<typeof IconTag>;

const Template: ComponentStory<typeof IconTag> = (args) => (
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
