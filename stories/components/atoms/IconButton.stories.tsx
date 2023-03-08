import { ComponentMeta, ComponentStory } from '@storybook/react';

import IconButton, { IconButtonProps } from '@/components/atoms/IconButton';

export default {
  title: 'components/atoms/IconButton',
  component: IconButton,
  parameters: {
    componentSubtitle: '아이콘 버튼',
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args: IconButtonProps) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: 'Lightmode',
  onClick: () => console.log('HI'),
};

export const PlayButton = Template.bind({});
PlayButton.args = {
  icon: 'Play',
  iconSize: '36px',
  color: 'white',
  onClick: () => console.log('Play!'),
};
