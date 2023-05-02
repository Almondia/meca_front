import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon, { IconProps } from '@/components/common/Icon';

export default {
  title: 'components/common/Icon',
  component: Icon,
  parameters: {
    componentSubtitle: '아이콘',
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args: IconProps) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: 'Lightmode',
};

export const CustomSize50px = Template.bind({});
CustomSize50px.args = {
  icon: 'Lightmode',
  size: '50px',
};

export const CustomSize4rem = Template.bind({});
CustomSize4rem.args = {
  icon: 'Lightmode',
  size: '4rem',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  icon: 'Lightmode',
  color: '#FF00FF',
};
