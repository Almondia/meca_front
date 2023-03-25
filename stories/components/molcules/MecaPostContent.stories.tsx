import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaPostContent, { MecaPostContentProps } from '@/components/molcules/MecaPostContent';

export default {
  title: 'components/molcules/MecaPostContent',
  component: MecaPostContent,
  parameters: {
    componentSubtitle: '메모리 카드 콘텐츠',
    controls: {
      exclude: ['bodyType'],
    },
  },
} as ComponentMeta<typeof MecaPostContent>;

const Template: ComponentStory<typeof MecaPostContent> = (args: MecaPostContentProps) => (
  <div style={{ padding: '30px' }}>
    <MecaPostContent {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  question: '문제',
  answer: '내용내용내용 내용내용내용내용내용내용내용내용내용 내용내용내용',
  bodyType: 'KEYWORD',
};

export const OxContent = Template.bind({});
OxContent.args = {
  question: 'Answer',
  answer: 'O',
  bodyType: 'OX_QUIZ',
};

export const SelectContent = Template.bind({});
SelectContent.args = {
  question: '["다음 중 박동석의 MBTI로 적절한 것은?","INFP","ENFJ","ISTJ"]',
  answer: '1',
  bodyType: 'MULTI_CHOICE',
};
