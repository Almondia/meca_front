import { ComponentMeta, ComponentStory } from '@storybook/react';

import LikeButton from '@/components/@common/molecules/LikeButton';

export default {
  title: 'components/@common/molecules/LikeButton',
  component: LikeButton,
  parameters: {
    componentSubtitle: '추천 버튼',
  },
} as ComponentMeta<typeof LikeButton>;

const Template: ComponentStory<typeof LikeButton> = (args) => <LikeButton {...args} />;

export const Default = Template.bind({});
