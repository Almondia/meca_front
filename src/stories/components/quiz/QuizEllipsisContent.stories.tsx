import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuizEllipsisContent from '@/components/quiz/molecules/QuizEllipsisContent';

export default {
  title: 'components/quiz/QuizEllipsisContent',
  component: QuizEllipsisContent,
} as ComponentMeta<typeof QuizEllipsisContent>;

const Template: ComponentStory<typeof QuizEllipsisContent> = (args) => (
  <div style={{ maxWidth: '680px' }}>
    <QuizEllipsisContent {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: '제목제목',
  content:
    '천방지축 어리둥절 빙글빙글 돌아가는 짱구의 하루~ 우리의 짱구는 정말 못말려 (짱구야~) 짓굿은 장난은 나에게 맡기세요~ 천방지축 어리둥절 빙글빙글 돌아가는 짱구의 하루~ 우리의 짱구는 정말 못말려 (짱구야~) 짓굿은 장난은 나에게 맡기세요~천방지축 어리둥절 빙글빙글 돌아가는 짱구의 하루~ 우리의 짱구는 정말 못말려 (짱구야~) 짓굿은 장난은 나에게 맡기세요~ 천방지축 어리둥절 빙글빙글 돌아가는 짱구의 하루~ 우리의 짱구는 정말 못말려 (짱구야~) 짓굿은 장난은 나에게 맡기세요~',
};
