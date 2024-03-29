import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaCard from '@/components/meca/organisms/MecaCard';

export default {
  title: 'components/meca/MecaCard',
  component: MecaCard,
  parameters: {
    componentSubtitle: 'Meca',
    controls: {
      exclude: ['isMine', 'blurThumbnail'],
    },
  },
} as ComponentMeta<typeof MecaCard>;

const Template: ComponentStory<typeof MecaCard> = (args) => (
  <div style={{ maxWidth: '380px' }}>
    <MecaCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  card: {
    cardId: '',
    categoryId: '',
    memberId: '',
    title: '그 많던 싱아를 누가 다 먹었을까',
    question: '이러쿵 저러쿵 한 문제를 문제라고 하는데 그것은 너무너무 그것은 스토리북인데 그것은 말이지',
    cardType: 'KEYWORD',
    thumbnail: 'https://github.com/Almondia/meca_front/assets/76927397/b2ee4537-330f-4fc8-9360-c8902f2b2ce5',
    blurThumbnail: {
      width: 760,
      height: 340,
    },
    createdAt: '',
  },
  statistics: {
    scoreAvg: 45.5,
    tryCount: 24,
  },
  isMine: false,
};
