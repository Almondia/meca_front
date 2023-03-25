import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaPostContent from '@/components/molcules/MecaPostContent';
import MecaPostHead, { MecaPostHeadProps } from '@/components/molcules/MecaPostHead';

export default {
  title: 'components/molcules/MecaPostHead',
  component: MecaPostHead,
  parameters: {
    componentSubtitle: '메모리 카드 헤더 섹션',
  },
} as ComponentMeta<typeof MecaPostContent>;

const Template: ComponentStory<typeof MecaPostHead> = (args: MecaPostHeadProps) => (
  <div style={{ padding: '30px' }}>
    <MecaPostHead {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  cardType: 'MULTI_CHOICE',
  createdAt: '2023-03-25T02:13:28.061759',
};
