import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InfiniteData } from '@tanstack/react-query';
import { useState } from 'react';

import MecaList, { MecaListProps } from '@/components/organisms/MecaList';
import { MecaListResponse } from '@/apis/mecaApi';

export default {
  title: 'components/organisms/MecaList',
  component: MecaList,
  parameters: {
    componentSubtitle: '카테고리에 대한 카드 목록 컴포넌트',
    controls: {
      exclude: ['fetchNextPage', 'mecaList'],
    },
  },
} as ComponentMeta<typeof MecaList>;

const MecaListSample = {
  pageParams: [null],
  pages: [
    {
      contents: [
        {
          cardId: '1',
          title: 'title1',
          question: 'question',
          categoryId: 'c1',
          cardType: 'MULTI_CHOICE',
          answer: '1',
        },
        {
          cardId: '2',
          title: 'title2',
          question: 'question',
          categoryId: 'c1',
          cardType: 'OX_QUIZ',
          answer: 'O',
        },
        {
          cardId: '3',
          title: 'title3',
          question: 'questi1111111111111111111111111111on',
          categoryId: 'c1',
          cardType: 'OX_QUIZ',
          answer: 'O',
        },
        {
          cardId: '4',
          title: 'title4',
          question: 'question',
          categoryId: 'c1',
          cardType: 'MULTI_CHOICE',
          answer: '1',
        },
        {
          cardId: '5',
          title: 'title5',
          question: 'question',
          categoryId: 'c1',
          cardType: 'OX_QUIZ',
          answer: 'O',
        },
        {
          cardId: '6',
          title: 'title6',
          question: 'questi1111111111111111111111111111on',
          categoryId: 'c1',
          cardType: 'OX_QUIZ',
          answer: 'O',
        },
      ],
      categoryId: 'c1',
      categoryTitle: 'TITLE',
      hasNext: '6',
      pageSize: 6,
    },
  ],
} as unknown as InfiniteData<MecaListResponse>;

const Template: ComponentStory<typeof MecaList> = (args: MecaListProps) => (
  <div style={{ width: '100%' }}>
    <MecaList {...args} />
  </div>
);

export const Default = ({ hasNextPage, isMine }: { hasNextPage: boolean; isMine: boolean }) => {
  const [mecaList, setMecaList] = useState<InfiniteData<MecaListResponse>>(MecaListSample);
  const fetchNextPage = () => {
    if (!hasNextPage) {
      return;
    }
    const pageParam = mecaList.pages[mecaList.pages.length - 1].hasNext;
    const contents = [...Array(6).fill(Number(pageParam))].map((v, i) => {
      const meca = {
        cardId: (v + i).toString(),
        title: `title${v + i}`,
        question: Date.now().toString(),
        categoryId: 'c1',
        cardType: 'OX_QUIZ',
        answer: 'O',
      };
      return meca;
    });
    const newMecaList = {
      ...mecaList,
      pageParams: mecaList.pageParams.concat(pageParam),
      pages: [
        ...mecaList.pages,
        {
          contents,
          hasNext: (Number(pageParam) + 6).toString(),
          pageSize: 6,
        },
      ],
    } as unknown as InfiniteData<MecaListResponse>;
    setMecaList(newMecaList);
  };
  return <Template mecaList={mecaList} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isMine={isMine} />;
};

export const Empty = Template.bind({});
Empty.args = {
  mecaList: undefined,
  hasNextPage: false,
};
