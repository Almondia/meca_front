import { ComponentMeta, ComponentStory } from '@storybook/react';

import type { MecaHistoryListContent } from '@/types/domain/mecaHistory';

import QuizTimelineItem from '@/components/quiz/organisms/QuizTimelineItem';
import QuizTimelineItemSkeleton from '@/components/quiz/organisms/QuizTimelineItem/QuizTimelineItemSkeleton';

export default {
  title: 'components/quiz/QuizTimelineItem',
  component: QuizTimelineItem,
} as ComponentMeta<typeof QuizTimelineItem>;

const historyContent: MecaHistoryListContent = {
  cardHistory: {
    cardHistoryId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf99',
    userAnswer: '우하하하함ㅎㄷㅁㅎㅁ 우하하하함ㅎㄷㅁㅎㅁ 우하하하함ㅎㄷㅁㅎㅁ 우하하하함ㅎㄷㅁㅎㅁ aaaaaaaaaa',
    score: 80,
    createdAt: '2023-06-16T14:24:57.2667251',
  },
  solvedMember: {
    solvedMemberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
    solvedMemberName: 'simon',
  },
  card: {
    cardId: '0188c2a9-f132-cd1b-8505-be4dcf1bcf29',
    categoryId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
    memberId: '0188625a-433e-f7f6-0eb4-e24ef9a5bd05',
    title: 'Hello Quiz Title is Title Hello Quiz Title is Title Hello Quiz Title is Title',
    question:
      '질문이 엄청나게 길어서 짤릴수도 있으니까 이렇게 길게써보려는데 어느정도 길이까지 커버가 가능할까요 질문이 엄청나게 길어서 짤릴수도 있으니까 이렇게 길게써보려는데 어느정도 길이까지 커버가 가능할까요',
    answer: '정답이아주길면어떡하지어떡해어떡해해야할까요',
    cardType: 'ESSAY',
    createdAt: '2023-06-16T14:24:57.2667251',
  },
};

const Template: ComponentStory<typeof QuizTimelineItem> = (args) => <QuizTimelineItem {...args} />;

export const LeftTimelineItem = () => (
  <Template left {...historyContent.card} {...historyContent.cardHistory} scorePostfixText="12초 " unindented={false} />
);

export const RightTimelineItem = () => (
  <Template
    cardLink="/hello"
    left={false}
    {...historyContent.card}
    {...historyContent.cardHistory}
    score={20}
    scorePostfixText="by [최번개]"
    createdAt="2023-06-16T14:24:57.2667251"
    title="hello title!"
    question="hello question"
    unindented={false}
  />
);

export const Skeleton = () => <QuizTimelineItemSkeleton left unindented={false} />;
