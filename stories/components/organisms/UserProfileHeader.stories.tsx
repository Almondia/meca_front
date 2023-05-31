import { ComponentMeta, ComponentStory } from '@storybook/react';

import UserProfileHeader, { UserProfileProps } from '@/components/organisms/UserProfileHeader';

export default {
  title: 'components/organisms/UserProfileHeader',
  component: UserProfileHeader,
} as ComponentMeta<typeof UserProfileHeader>;

const Template: ComponentStory<typeof UserProfileHeader> = (args: UserProfileProps) => <UserProfileHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '김갑환',
  profile: 'https://velog.velcdn.com/images/pds0309/profile/7c9d0893-f701-4be4-9cea-ff05e5581eb0/image.jpg',
};
