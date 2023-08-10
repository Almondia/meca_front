import { ComponentMeta, ComponentStory } from '@storybook/react';

import IconButton from '@/components/@common/molecules/IconButton';

export default {
  title: 'components/@common/molecules/IconButton',
  component: IconButton,
  parameters: {
    componentSubtitle: '아이콘 버튼',
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

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
