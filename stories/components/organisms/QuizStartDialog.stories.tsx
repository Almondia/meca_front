import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizStartDialog, { QuizStartDialogProps } from '@/components/organisms/QuizStartDialog';

export default {
  title: 'components/organisms/QuizStartDialog',
  component: QuizStartDialog,
} as ComponentMeta<typeof QuizStartDialog>;

const Template: ComponentStory<typeof QuizStartDialog> = (args: QuizStartDialogProps) => <QuizStartDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  quizNum: 20,
  visible: false,
};
