import { ComponentMeta, ComponentStory } from '@storybook/react';

import LinkButton, { LinkButtonProps } from '@/components/atoms/LinkButton';

export default {
  title: 'components/atoms/LinkButton',
  component: LinkButton,
  parameters: {
    componentSubtitle: '링크 UI의 버튼',
  },
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = (args: LinkButtonProps) => <LinkButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'hello',
  textColor: 'brand',
  textSize: 'caption',
};
