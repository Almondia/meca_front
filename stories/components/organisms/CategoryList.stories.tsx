import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryList, { CategoryListProps } from '@/components/organisms/CategoryList';

export default {
  title: 'components/organisms/CategoryList',
  component: CategoryList,
  parameters: {
    componentSubtitle: '카테고리 목록 페이지 하단 목록 영역',
  },
} as ComponentMeta<typeof CategoryList>;

const Template: ComponentStory<typeof CategoryList> = (args: CategoryListProps) => (
  <div style={{ width: '100%' }}>
    <CategoryList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  categoryList: [
    {
      categoryId: '1',
      title: 'title1',
    },
    {
      categoryId: '2',
      title: 'title2',
    },
    {
      categoryId: '3',
      title: 'title3',
    },
    {
      categoryId: '4',
      title: 'title4',
    },
    {
      categoryId: '5',
      title: 'title5',
    },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  categoryList: [],
};
