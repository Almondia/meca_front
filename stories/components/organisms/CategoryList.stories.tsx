import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryList, { CategoryListProps } from '@/components/organisms/CategoryList';

export default {
  title: 'components/organisms/CategoryList',
  component: CategoryList,
  parameters: {
    componentSubtitle: '카테고리 목록 페이지 하단 목록 영역',
    controls: {
      exclude: ['fetchNextPage'],
    },
  },
} as ComponentMeta<typeof CategoryList>;

const Template: ComponentStory<typeof CategoryList> = (args: CategoryListProps) => (
  <div style={{ width: '100%' }}>
    <CategoryList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  categoryList: {
    pageParams: [undefined],
    pages: [
      {
        contents: [
          {
            categoryId: '1',
            title: 'title1',
            thumbnail: '01874ace-e463-2b93-436c-7e406943df11/thumbnail/67bdcf9e-5789-4ba8-90d1-af1e018ecb24.jpg',
            shared: false,
            name: 'name',
          },
          {
            categoryId: '2',
            title: 'title2',
            thumbnail: '',
            shared: true,
            name: 'name',
          },
          {
            categoryId: '3',
            title: 'title3',
            thumbnail: '',
            shared: false,
            name: 'name',
          },
          {
            categoryId: '4',
            title: 'title4',
            thumbnail: '',
            shared: false,
            name: 'name',
          },
          {
            categoryId: '5',
            title: 'title5',
            thumbnail: '',
            shared: false,
            name: 'name',
          },
          {
            categoryId: '6',
            title: 'title6',
            thumbnail: '',
            shared: false,
            name: 'name',
          },
        ],
        pageNumber: 0,
        totalPages: 1,
      },
    ],
  },
} as any;

export const Empty = Template.bind({});
Empty.args = {
  categoryList: undefined,
};
