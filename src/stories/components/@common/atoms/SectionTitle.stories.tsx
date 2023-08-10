import { ComponentMeta, ComponentStory } from '@storybook/react';

import SectionTitle from '@/components/@common/atoms/SectionTitle';

export default {
  title: 'components/@common/atoms/SectionTitle',
  component: SectionTitle,
  parameters: {
    componentSubtitle: '섹션 타이틀',
  },
} as ComponentMeta<typeof SectionTitle>;

const Template: ComponentStory<typeof SectionTitle> = (args) => <SectionTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Hello World!',
};
