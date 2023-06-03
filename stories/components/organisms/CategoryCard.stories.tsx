/* eslint-disable react/destructuring-assignment */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryCard, { CategoryCardProps } from '@/components/organisms/CategoryCard';

export default {
  title: 'components/organisms/CategoryCard',
  component: CategoryCard,
  parameters: {
    componentSubtitle: '카테고리 카드',
  },
} as ComponentMeta<typeof CategoryCard>;

const Template: ComponentStory<typeof CategoryCard> = (args: CategoryCardProps) => (
  <div style={{ padding: '30px', maxWidth: '380px' }}>
    <CategoryCard {...args}>{args.children}</CategoryCard>
  </div>
);

export const Private = Template.bind({});
Private.args = {
  title: '카테고리 제목',
  children: (
    <CategoryCard.Private
      shared={false}
      thumbnail=""
      title="title"
      solveCount={5}
      totalCount={10}
      scoreAvg={0.6}
      categoryId={Private.args?.categoryId ?? 'cid'}
      createdAt=""
      memberId="memberId"
      likeCount={15}
    />
  ),
};

export const Shared = Template.bind({});
Shared.args = {
  title: '카테고리 제목',
  children: <CategoryCard.Shared memberId="memberId" name="name" profile="" likeCount={5} />,
};
