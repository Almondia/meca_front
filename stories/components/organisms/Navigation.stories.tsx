import { ComponentMeta, ComponentStory } from '@storybook/react';

import Navigation, { NavigationProps } from '@/components/organisms/Navigation';

export default {
  title: 'components/organisms/Navigation',
  component: Navigation,
  parameters: {
    componentSubtitle: '헤더',
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args: NavigationProps) => <Navigation {...args} />;

export const NoAuth = Template.bind({});

export const Auth = Template.bind({});
Auth.args = {
  loginUserName: '유저이름은몇글자까지',
};
