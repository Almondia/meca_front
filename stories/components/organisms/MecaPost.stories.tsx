import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaPost, { MecaPostProps } from '@/components/organisms/MecaPost';
import { PostSection } from '@/styles/layout';

export default {
  title: 'components/organisms/MecaPost',
  component: MecaPost,
  parameters: {
    componentSubtitle: '메모리 카드 게시글 컴포넌트',
    controls: {
      exclude: ['cardType', 'answer', 'question'],
    },
  },
} as ComponentMeta<typeof MecaPost>;

const Template: ComponentStory<typeof MecaPost> = (args: MecaPostProps) => (
  <PostSection>
    <MecaPost {...args} />
  </PostSection>
);

export const OxPost = Template.bind({});
OxPost.args = {
  cardType: 'OX_QUIZ',
  createdAt: '2023-03-25T02:13:28.061759',
  question: '문제다문제',
  answer: 'O',
};

export const SelectPost = Template.bind({});
SelectPost.args = {
  cardType: 'MULTI_CHOICE',
  createdAt: '2023-03-25T02:13:28.061759',
  question: '["다음 중 박동석의 MBTI로 적절한 것은?","INFP","ENFJ","ISTJ"]',
  answer: '1',
};

export const KeywordPost = Template.bind({});
KeywordPost.args = {
  cardType: 'KEYWORD',
  createdAt: '2023-03-25T02:13:28.061759',
  question: '박동석의 MBTI는 무엇인가요',
  answer: 'INFP',
};
