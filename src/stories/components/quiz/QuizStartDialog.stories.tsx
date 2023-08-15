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
    restHandler(mockedGetSimulationMecasApi),
  ]);
  return <QuizStartDialog {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  visible: true,
};
