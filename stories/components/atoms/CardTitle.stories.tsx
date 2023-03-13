/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import CardTitle, { CardTitleProps } from '@/components/atoms/CardTitle';

export default {
  title: 'components/atoms/CardTitle',
  component: CardTitle,
  parameters: {
    componentSubtitle: '카드 타이틀',
  },
} as ComponentMeta<typeof CardTitle>;

const Template: ComponentStory<typeof CardTitle> = (args: CardTitleProps) => <CardTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'title',
  link: '',
  onClick: () => alert('HI'),
};
