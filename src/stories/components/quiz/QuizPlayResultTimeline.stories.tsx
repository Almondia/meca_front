import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizPlayResultTimeline from '@/components/quiz/organisms/QuizPlayResultTimeline';
import { MOCK_QUIZ_RESULTS } from '@/mock/data';

export default {
  title: 'components/quiz/QuizPlayResultTimeline',
  component: QuizPlayResultTimeline,
} as ComponentMeta<typeof QuizPlayResultTimeline>;

const quizList = MOCK_QUIZ_RESULTS;

const Template: ComponentStory<typeof QuizPlayResultTimeline> = () => (
  <div style={{ maxWidth: '864px' }}>
    <QuizPlayResultTimeline quizList={quizList} />
  </div>
);

export const Default = Template.bind({});
