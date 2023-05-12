import { ComponentMeta, ComponentStory } from '@storybook/react';

import MecaCard, { MecaCardProps } from '@/components/organisms/MecaCard';

export default {
  title: 'components/organisms/MecaCard',
  component: MecaCard,
  parameters: {
    componentSubtitle: '메모리 카드',
  },
} as ComponentMeta<typeof MecaCard>;

const Template: ComponentStory<typeof MecaCard> = (args: MecaCardProps) => (
  <div style={{ padding: '30px', maxWidth: '380px' }}>
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
  description:
    "<p>161616<img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682306625453.png'></p><p><br></p><p>&lt;img src=\"hello\"/&gt;</p><p><br></p><p><img src='https://my-meca.s3.ap-northeast-2.amazonaws.com/01879c33-ebf3-6056-952f-d6d831d4b0bb/card/1682300937980.png'></p>",
};
