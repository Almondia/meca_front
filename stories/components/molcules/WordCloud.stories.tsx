import { ComponentMeta, ComponentStory } from '@storybook/react';

import WordCloud, { WordCludProps } from '@/components/molcules/Chart/WordCloud';

export default {
  title: 'components/molcules/WordCloud',
  component: WordCloud,
  parameters: {
    componentSubtitle: '워드클라우드',
  },
} as ComponentMeta<typeof WordCloud>;

const Template: ComponentStory<typeof WordCloud> = (args: WordCludProps) => (
  <div style={{ padding: '30px' }}>
    <WordCloud {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  maxheight: '300px',
  words: [
    { text: 'hello', value: 5 },
    { text: '안녕하세요', value: 25 },
    { text: '김갑환', value: 1 },
    { text: 'Google', value: 4 },
    { text: '최번개', value: 6 },
    { text: 'react', value: 2 },
    { text: 'Javascript', value: 9 },
    { text: 'typescript', value: 2 },
    { text: '노래', value: 1 },
    { text: '음악', value: 1 },
    { text: '코딩', value: 3 },
    { text: 'value', value: 1 },
    { text: 'month', value: 1 },
    { text: 'month', value: 1 },
    { text: '박동석', value: 3 },
    { text: 'MECA', value: 17 },
  ],
};
