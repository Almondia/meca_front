import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoadSpinner, { LoadSpinnerProps } from '@/components/atoms/LoadSpinner';

export default {
  title: 'components/atoms/LoadSpinner',
  component: LoadSpinner,
  parameters: {
    componentSubtitle: '로드 스피너 컴포넌트',
  },
} as ComponentMeta<typeof LoadSpinner>;

const Template: ComponentStory<typeof LoadSpinner> = (args: LoadSpinnerProps) => <LoadSpinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: '40px',
  width: '100%',
};
