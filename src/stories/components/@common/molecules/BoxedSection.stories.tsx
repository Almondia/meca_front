import { ComponentMeta, ComponentStory } from '@storybook/react';

import BoxedSection from '@/components/@common/molecules/BoxedSection';

export default {
  title: 'components/@common/molecules/BoxedSection',
  component: BoxedSection,
  parameters: {
    componentSubtitle: '컨텐츠 박스 컴포넌트',
  },
} as ComponentMeta<typeof BoxedSection>;

const Template: ComponentStory<typeof BoxedSection> = (args) => <BoxedSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: 'Q.',
  body: '제 2 정규형에서 제 3정규형이 되기 위한 조건은 무엇일까요?',
};

export const Column = Template.bind({});
Column.args = {
  header: 'Title.',
  body: 'Work it Harder Make it Better Do it Faster Makes as Stronger',
  isColumn: true,
};
