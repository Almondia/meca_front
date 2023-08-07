import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoadSpinner from '@/components/@common/atoms/LoadSpinner';

export default {
  title: 'components/@common/atoms/LoadSpinner',
  component: LoadSpinner,
  parameters: {
    componentSubtitle: '로드 스피너 컴포넌트',
  },
} as ComponentMeta<typeof LoadSpinner>;

const Template: ComponentStory<typeof LoadSpinner> = (args) => <LoadSpinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: '40px',
  width: '100%',
};
