import { ComponentMeta, ComponentStory } from '@storybook/react';

import Navigation from '@/components/organisms/Navigation';

export default {
  title: 'components/organisms/Navigation',
  component: Navigation,
  parameters: {
    componentSubtitle: '헤더',
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = () => <Navigation />;

export const Default = Template.bind({});
