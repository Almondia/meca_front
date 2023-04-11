import { ComponentMeta, ComponentStory } from '@storybook/react';

import Logo, { LogoProps } from '@/components/atoms/Logo';

export default {
  title: 'components/atoms/Logo',
  component: Logo,
  parameters: {
    componentSubtitle: '로고',
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args: LogoProps) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'normal',
};
