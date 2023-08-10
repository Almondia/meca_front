import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategorySearchBar from '@/components/category/molecules/CategorySearchBar';

export default {
  title: 'components/category/CategorySearchBar',
  component: CategorySearchBar,
  parameters: {
    componentSubtitle: '카테고리 검색 인풋+버튼',
  },
} as ComponentMeta<typeof CategorySearchBar>;

const Template: ComponentStory<typeof CategorySearchBar> = (args) => (
  <div style={{ maxWidth: '600px' }}>
    <CategorySearchBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  query: '',
  onChangeQuery: () => console.log('Change Query'),
};
