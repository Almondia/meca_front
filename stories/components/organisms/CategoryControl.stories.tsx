import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryControl, { CategoryControlProps } from '@/components/organisms/CategoryControl';

export default {
  title: 'components/organisms/CategoryControl',
  component: CategoryControl,
  parameters: {
    componentSubtitle: '카테고리 목록 페이지 상단 영역',
  },
} as ComponentMeta<typeof CategoryControl>;

const Template: ComponentStory<typeof CategoryControl> = (args: CategoryControlProps) => <CategoryControl {...args} />;

export const Default = Template.bind({});
