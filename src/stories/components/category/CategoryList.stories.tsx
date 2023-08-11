import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryList from '@/components/category/organisms/CategoryList';
import { MOCK_CATEGORY_PAGINATION_LIST_PRESENT } from '@/mock/data';

export default {
  title: 'components/category/CategoryList',
  component: CategoryList,
  parameters: {
    componentSubtitle: '카테고리 목록 페이지 하단 목록 영역',
    controls: {
      exclude: ['fetchNextPage'],
    },
  },
} as ComponentMeta<typeof CategoryList>;

const Template: ComponentStory<typeof CategoryList> = (args) => (
  <div style={{ width: '100%' }}>
    <CategoryList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  categoryList: MOCK_CATEGORY_PAGINATION_LIST_PRESENT,
  isEmpty: false,
};

export const Empty = Template.bind({});
Empty.args = {
  categoryList: undefined,
  isEmpty: true,
};
