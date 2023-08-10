import { ComponentMeta, ComponentStory } from '@storybook/react';

import PageTitle from '@/components/@common/atoms/PageTitle';

export default {
  title: 'components/@common/atoms/PageTitle',
  component: PageTitle,
  parameters: {
    componentSubtitle: '페이지 타이틀',
  },
} as ComponentMeta<typeof PageTitle>;

const Template: ComponentStory<typeof PageTitle> = (args) => <PageTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello World!',
};
