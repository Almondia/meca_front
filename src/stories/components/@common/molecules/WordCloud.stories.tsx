import { ComponentMeta, ComponentStory } from '@storybook/react';

import WordCloud from '@/components/@common/molecules/Chart/WordCloud';

export default {
  title: 'components/@common/molecules/WordCloud',
  component: WordCloud,
  parameters: {
    componentSubtitle: '워드클라우드',
    controls: {
      exclude: ['isLoading'],
    },
  },
} as ComponentMeta<typeof WordCloud>;

const Template: ComponentStory<typeof WordCloud> = (args) => (
  <div style={{ maxWidth: '700px' }}>
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
  isLoading: false,
};

export const Empty = Template.bind({});
Empty.args = {
  maxheight: '300px',
  words: [],
  isLoading: false,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  maxheight: '300px',
  words: [],
  isLoading: true,
};
