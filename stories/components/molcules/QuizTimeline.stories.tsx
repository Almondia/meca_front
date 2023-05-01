import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizTimeline from '@/components/molcules/QuizTimeline';
import { QuizType } from '@/types/domain';

export default {
  title: 'components/molcules/QuizTimeline',
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
    cardId: 'cid03',
    cardType: 'MULTI_CHOICE',
    answer: '3',
    categoryId: 'cat02',
    description: '',
    createdAt: '',
    question: '["객1","보기1","보기2","보기31"]',
    title: 'title',
    result: { score: 100, userAnswer: '3', spendTime: 6 },
  },
];

const Template: ComponentStory<typeof QuizTimeline> = () => <QuizTimeline quizList={quizList} />;

export const Default = Template.bind({});
