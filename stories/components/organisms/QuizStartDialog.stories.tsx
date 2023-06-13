import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizStartDialog, { QuizStartDialogProps } from '@/components/organisms/QuizStartDialog';
import { mockedGetSimulationMecasApi } from '@/mock/api';
import { restHandler } from '@/mock/handlers';
import { implementWorker } from '@/mock/worker';

export default {
  title: 'components/organisms/QuizStartDialog',
  component: QuizStartDialog,
} as ComponentMeta<typeof QuizStartDialog>;

const Template: ComponentStory<typeof QuizStartDialog> = (args: QuizStartDialogProps) => {
  implementWorker([restHandler(mockedGetSimulationMecasApi, { status: 400, message: '퀴즈풀이 시작!' })]);
  return <QuizStartDialog {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  quizNum: 20,
  visible: false,
};
