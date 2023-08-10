/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizRetryController from '@/components/quiz/organisms/QuizRetryController';

export default {
  title: 'components/quiz/QuizRetryController',
  component: QuizRetryController,
} as ComponentMeta<typeof QuizRetryController>;

const Template: ComponentStory<typeof QuizRetryController> = (args) => <QuizRetryController {...args} />;

export const Default = Template.bind({});
Default.args = {
  onRetry(optionScore) {
    alert(`${optionScore}점 이하의 문제를 다시 풀어요!`);
  },
  title: 'Quiz Title',
};
