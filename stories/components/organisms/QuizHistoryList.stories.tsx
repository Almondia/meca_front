import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InfiniteData } from '@tanstack/react-query';

import { CardHistoryListResponse } from '@/apis/cardHistoryApi';
import QuizHistoryList, { QuizHistoryListProps } from '@/components/organisms/QuizHistoryList';

export default {
  title: 'components/organisms/QuizHistoryList',
  component: QuizHistoryList,
} as ComponentMeta<typeof QuizHistoryList>;

const HISTORY_LIST: InfiniteData<CardHistoryListResponse> = {
  pageParams: [null, '0188625a-433e-f7f6-0eb4-e24ef9a5bd04'],
  pages: [
    {
      contents: [
        {
          cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd00',
          solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd01',
          solvedMemberName: '이름이엄청길수도있어요',
          userAnswer: 'answer',
          score: 62,
          categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd02',
          cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd03',
          createdAt: '2023-05-28T21:34:22.6543507',
          title: 'title',
          question: '박동석의 MBTI는 무엇일까요?',
          answer: 'answer',
          cardType: 'KEYWORD',
          memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        },
        {
          cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd01',
          solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd02',
          solvedMemberName: 'name',
          userAnswer: '1',
          score: 0,
          categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd03',
          cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
          createdAt: '2023-05-24T21:34:22.6543507',
          title: 'title',
          question: '["다음 중 박동석의 MBTI로 적절한 것은?","INFP","ENFJ","ISTJ"]',
          answer: '1',
          cardType: 'MULTI_CHOICE',
          memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        },
      ],
      hasNext: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
      pageSize: 2,
    },
    {
      contents: [
        {
          cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
          solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
          solvedMemberName: 'name',
          userAnswer: 'answer',
          score: 35,
          categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd07',
          cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd08',
          createdAt: '2023-05-22T21:34:22.6543507',
          title: 'title',
          question:
            '질문이 엄청나게 길어서 짤릴수도 있으니까 이렇게 길게써보려는데 어느정도 길이까지 커버가 가능할까요',
          answer: '정답이아주길면어떡하지어떡해어떡해해야할까요',
          cardType: 'KEYWORD',
          memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        },
      ],
      hasNext: undefined,
      pageSize: 2,
    },
  ],
};

const Template: ComponentStory<typeof QuizHistoryList> = (args: QuizHistoryListProps) => {
  const fetchNextPage = () => console.log('fetch next page');
  return <QuizHistoryList {...args} fetchNextPage={fetchNextPage} />;
};

export const Default = Template.bind({});
Default.args = {
  historyList: HISTORY_LIST,
};

export const ExcludedQuestion = Template.bind({});
ExcludedQuestion.args = {
  historyList: HISTORY_LIST,
  excludeRows: ['question'],
};

export const ExcludedUser = Template.bind({});
ExcludedUser.args = {
  historyList: HISTORY_LIST,
  excludeRows: ['user'],
};

export const Empty = Template.bind({});
Empty.args = {
  historyList: undefined,
  excludeRows: ['user'],
};
