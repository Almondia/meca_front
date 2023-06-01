import { ComponentMeta, ComponentStory } from '@storybook/react';

import LikeButton, { LikeButtonProps } from '@/components/atoms/LikeButton';

export default {
  title: 'components/atoms/LikeButton',
  component: LikeButton,
  parameters: {
    componentSubtitle: '추천 버튼',
  },
} as ComponentMeta<typeof LikeButton>;

const Template: ComponentStory<typeof LikeButton> = (args: LikeButtonProps) => <LikeButton {...args} />;

export const Default = Template.bind({});
