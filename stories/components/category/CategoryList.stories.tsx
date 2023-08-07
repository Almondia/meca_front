import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryList from '@/components/category/organisms/CategoryList';

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
  categoryList: {
    contents: [
      {
        categoryId: '1',
        title: 'What is Lorem Ipsum',
        thumbnail: 'https://github.com/Almondia/meca_front/assets/76927397/b2ee4537-330f-4fc8-9360-c8902f2b2ce5',
        shared: false,
        name: 'Terry Collins',
        likeCount: 0,
      },
      {
        categoryId: '2',
        title: 'The standard Lorem Ipsum passage, used since the 1500s',
        thumbnail: '',
        shared: true,
        name: '김갑환의 봉황각',
        likeCount: 0,
      },
      {
        categoryId: '3',
        title: 'Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC',
        thumbnail: '',
        shared: false,
        name: '일이삼사오육칠팔구십',
        likeCount: 14,
      },
      {
        categoryId: '4',
        title: '오키오키오키나와',
        thumbnail: 'https://github.com/Almondia/meca_front/assets/76927397/24cb26a7-e284-45c9-a9d0-d9dfb5e6baa6',
        shared: false,
        name: 'name',
        likeCount: 5,
      },
      {
        categoryId: '5',
        title: '가슴이 웅장해지는 김갑환의 봉황각',
        thumbnail:
          'https://github-production-user-asset-6210df.s3.amazonaws.com/76927397/245342957-cdf35a58-74e6-4682-a78f-d3fee75189f7.gif',
        shared: false,
        name: '최번개',
        likeCount: 142,
      },
      {
        categoryId: '6',
        title: '1914 translation by H. Rackham',
        thumbnail: 'https://github.com/Almondia/meca_front/assets/76927397/6fa3c29b-88c0-4482-aa09-1e3c6804de78',
        shared: false,
        name: 'name',
        likeCount: 14,
      },
    ],
    pageSize: 0,
  },
} as any;

export const Empty = Template.bind({});
Empty.args = {
  categoryList: undefined,
  isEmpty: true,
};
