import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizStartDialog from '@/components/quiz/organisms/QuizStartDialog';
import { mockedGetQuizCardsSimulationStateByCategoryIdApi, mockedGetSimulationMecasApi } from '@/mock/api';
import { restHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';

export default {
  title: 'components/quiz/QuizStartDialog',
  component: QuizStartDialog,
} as ComponentMeta<typeof QuizStartDialog>;

const Template: ComponentStory<typeof QuizStartDialog> = (args) => {
  implementWorker([
    restHandler(mockedGetQuizCardsSimulationStateByCategoryIdApi),
    restHandler(mockedGetSimulationMecasApi, { status: 400, message: '퀴즈풀이 시작!' }),
  ]);
  return <QuizStartDialog {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  visible: true,
};
