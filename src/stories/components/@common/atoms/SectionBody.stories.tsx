import { ComponentMeta, ComponentStory } from '@storybook/react';

import SectionBody from '@/components/@common/atoms/SectionBody';

export default {
  title: 'components/@common/atoms/SectionBody',
  component: SectionBody,
  parameters: {
    componentSubtitle: '섹션 콘텐츠',
  },
} as ComponentMeta<typeof SectionBody>;

const Template: ComponentStory<typeof SectionBody> = (args) => <SectionBody {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
      standard dummy text ever since the 1500s
    </p>
  ),
  indented: true,
};
