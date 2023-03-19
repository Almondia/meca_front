import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaCard, { MecaCardProps } from '@/components/molcules/MecaCard';

export default {
  title: 'components/molcules/MecaCard',
  component: MecaCard,
  parameters: {
    componentSubtitle: '메모리 카드',
  },
} as ComponentMeta<typeof MecaCard>;

const Template: ComponentStory<typeof MecaCard> = (args: MecaCardProps) => (
  <div style={{ padding: '30px' }}>
    <MecaCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  cardId: '',
  categoryId: '',
  title: '문제 타이틀',
  question: '이러쿵 저러쿵 한 문제를 문제라고 하는데 그것은 너무너무 그것은 스토리북인데 그것은 말이지',
  tagType: 'keyword',
  isMine: true,
};
