/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizRetryController, { QuizRetryControllerProps } from '@/components/organisms/QuizRetryController';

export default {
  title: 'components/organisms/QuizRetryController',
  component: QuizRetryController,
} as ComponentMeta<typeof QuizRetryController>;

const Template: ComponentStory<typeof QuizRetryController> = (args: QuizRetryControllerProps) => (
  <QuizRetryController {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onRetry(optionScore) {
    alert(`${optionScore}점 이하의 문제를 다시 풀어요!`);
  },
  title: 'Quiz Title',
};
