import { ComponentMeta, ComponentStory } from '@storybook/react';

import AvatarUser, { AvatarUserProps } from '@/components/molcules/AvatarUser';

export default {
  title: 'components/molcules/AvatarUser',
  component: AvatarUser,
  parameters: {
    componentSubtitle: '카드 작성자 정보 컴포넌트',
  },
} as ComponentMeta<typeof AvatarUser>;

const Template: ComponentStory<typeof AvatarUser> = (args: AvatarUserProps) => <AvatarUser {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '사용자 이름',
};
