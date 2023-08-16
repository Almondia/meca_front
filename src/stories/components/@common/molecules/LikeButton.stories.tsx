import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import LikeButton from '@/components/@common/molecules/LikeButton';

export default {
  title: 'components/@common/molecules/LikeButton',
  component: LikeButton,
  parameters: {
    componentSubtitle: '추천 버튼',
  },
} as ComponentMeta<typeof LikeButton>;

const Template: ComponentStory<typeof LikeButton> = ({ likeCount, disabled = false, defaultActiveState = true }) => {
  const [active, setActive] = useState<boolean>(defaultActiveState);
  const handleClick = () => {
    setActive((prev) => !prev);
    return !active;
  };
  return (
    <LikeButton
      defaultActiveState={defaultActiveState}
      disabled={disabled}
      likeCount={active ? likeCount + 1 : likeCount}
      onClick={handleClick}
      buttonName="name"
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  likeCount: 12,
  disabled: false,
  defaultActiveState: true,
};
