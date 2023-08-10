import { ComponentMeta, ComponentStory } from '@storybook/react';

import Logo from '@/components/@common/atoms/Logo';

export default {
  title: 'components/@common/atoms/Logo',
  component: Logo,
  parameters: {
    componentSubtitle: '로고',
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'normal',
};
