import { ComponentMeta, ComponentStory } from '@storybook/react';

import AvatarUser from '@/components/@common/molecules/AvatarUser';

export default {
  title: 'components/@common/molecules/AvatarUser',
  component: AvatarUser,
} as ComponentMeta<typeof AvatarUser>;

const Template: ComponentStory<typeof AvatarUser> = (args) => <AvatarUser {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '사용자 이름',
};
