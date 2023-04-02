import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizStartDialog, { QuizStartDialogProps } from '@/components/molcules/QuizStartDialog';

export default {
  title: 'components/molcules/QuizStartDialog',
  component: QuizStartDialog,
} as ComponentMeta<typeof QuizStartDialog>;

const Template: ComponentStory<typeof QuizStartDialog> = (args: QuizStartDialogProps) => <QuizStartDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  quizNum: 20,
  visible: false,
};
