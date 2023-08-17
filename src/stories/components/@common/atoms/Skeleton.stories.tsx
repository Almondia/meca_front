import { ComponentMeta, ComponentStory } from '@storybook/react';

import Skeleton from '@/components/@common/atoms/Skeleton';

export default {
  title: 'components/@common/atoms/Skeleton',
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  style: {
    width: '300px',
    height: '100px',
  },
  children: <Skeleton.Content style={{ height: '50px' }} />,
};

export const WithMultiple = Template.bind({});
WithMultiple.args = {
  style: {
    width: '328px',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-normal)',
  },
  children: (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <Skeleton.Content style={{ height: '20px' }} />
      <Skeleton.Content style={{ height: '10px', width: '80%' }} />
      <Skeleton.Content style={{ height: '10px', width: '80%' }} />
    </div>
  ),
};
