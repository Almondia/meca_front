import { ComponentMeta, ComponentStory } from '@storybook/react';

import Avatar, { AvatarProps } from '@/components/atoms/Avatar';

export default {
  title: 'components/atoms/Avatar',
  component: Avatar,
  parameters: {
    componentSubtitle: '링크 UI의 버튼',
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args: AvatarProps) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  imgSrc: 'https://velog.velcdn.com/images/pds0309/profile/7c9d0893-f701-4be4-9cea-ff05e5581eb0/image.jpg',
  imgSize: 120,
  imgName: '나',
};

export const OnError = Template.bind({});
OnError.args = {
  imgSrc: '/eahahgea/gegagea',
  imgSize: 120,
};
