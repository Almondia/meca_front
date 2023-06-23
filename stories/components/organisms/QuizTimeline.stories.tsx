import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizTimeline from '@/components/organisms/QuizTimeline';
import { QuizType } from '@/types/domain';

export default {
  title: 'components/organisms/QuizTimeline',
  component: QuizTimeline,
} as ComponentMeta<typeof QuizTimeline>;

const quizList: QuizType[] = [
  {
    cardId: 'cid01',
    cardType: 'KEYWORD',
    answer: 'answer',
    categoryId: 'cat01',
    description: '',
    createdAt: '',
    question: 'question',
    title: 'title',
    result: { score: 100, userAnswer: 'answer', spendTime: 4 },
  },
  {
    cardId: 'cid02',
    cardType: 'KEYWORD',
    answer: 'answer',
    categoryId: 'cat02',
    description: '',
    createdAt: '',
    question: 'question',
    title: 'title',
    result: { score: 0, userAnswer: 'answer2', spendTime: 6 },
  },
  {
    cardId: 'cid04',
    cardType: 'ESSAY',
    answer:
      'JavaScript 런타임 환경에서 동작하는 기능으로 callstack, callback queue, microtask queue를 감시하며 callstack이 비워졌을 경우 적절한 callback queue를 호출하도록 하는 비동기/논블로킹 동작의 핵심이 되는 기술',
    categoryId: 'cat02',
    description: '',
    createdAt: '',
    question: '이벤트 루프를 설명해보세요',
    title: 'title',
    result: {
      score: 100,
      userAnswer:
        '천방지축 어리둥절 빙글빙글 돌아가는 짱구의 하루~ 우리의 짱구는 정말 못말려 (짱구야~) 짓굿은 장난은 나에게 맡기세요~',
      spendTime: 6,
    },
  },
  {
    cardId: 'cid03',
    cardType: 'MULTI_CHOICE',
    answer: '2',
    categoryId: 'cat02',
    description: '',
    createdAt: '',
    question: '["박동석의 MBTI로 적절한 것은?","ESTJ","INFP","INTJ"]',
    title: 'title',
    result: { score: 100, userAnswer: '2', spendTime: 6 },
  },
];

const Template: ComponentStory<typeof QuizTimeline> = () => <QuizTimeline quizList={quizList} />;

export const Default = Template.bind({});
