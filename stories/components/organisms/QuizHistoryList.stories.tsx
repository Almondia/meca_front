import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InfiniteData } from '@tanstack/react-query';

import { CardHistoryListResponse } from '@/apis/cardHistoryApi';
import QuizHistoryList, { QuizHistoryListProps } from '@/components/organisms/QuizHistoryList';
import { PostSection } from '@/styles/layout';

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
        {
          cardHistoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
          solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd02',
          solvedMemberName: 'name',
          userAnswer:
            '천방지축 어리둥절 빙글빙글 돌아가는 짱구의 하루~ 우리의 짱구는 정말 못말려 (짱구야~) 짓굿은 장난은 나에게 맡기세요~',
          score: 0,
          categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd03',
          cardId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
          createdAt: '2023-05-24T21:34:22.6543507',
          title: 'title',
          question: 'event loop를 설명해보세요',
          answer:
            'JavaScript 런타임 환경에서 동작하는 기능으로 callstack, callback queue, microtask queue를 감시하며 callstack이 비워졌을 경우 적절한 callback queue를 호출하도록 하는 비동기/논블로킹 동작의 핵심이 되는 기술',
          cardType: 'ESSAY',
          memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
        },
      ],
      hasNext: '0188625a-433e-f7f6-0eb4-e24ef9a5bd04',
      pageSize: 3,
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
      pageSize: 3,
    },
  ],
};

const Template: ComponentStory<typeof QuizHistoryList> = (args: QuizHistoryListProps) => {
  const fetchNextPage = () => console.log('fetch next page');
  return <QuizHistoryList {...args} fetchNextPage={fetchNextPage} />;
};

export const Default = () => (
  <PostSection>
    <Template fetchNextPage={() => console.log('')} historyList={HISTORY_LIST} />
  </PostSection>
);

export const ExcludedUser = () => (
  <PostSection>
    <Template fetchNextPage={() => console.log('')} historyList={HISTORY_LIST} excludeRows={['user']} />
  </PostSection>
);

export const Empty = () => (
  <PostSection>
    <Template fetchNextPage={() => console.log('')} historyList={undefined} excludeRows={['user']} />
  </PostSection>
);
