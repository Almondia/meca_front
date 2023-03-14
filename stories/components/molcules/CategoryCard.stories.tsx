import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryCard, { CategoryCardProps } from '@/components/molcules/CategoryCard';

export default {
  title: 'components/molcules/CategoryCard',
  component: CategoryCard,
  parameters: {
    componentSubtitle: '카테고리 카드',
  },
} as ComponentMeta<typeof CategoryCard>;

const Template: ComponentStory<typeof CategoryCard> = (args: CategoryCardProps) => (
  <div style={{ padding: '30px' }}>
    <CategoryCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: '카테고리 제목',
};
