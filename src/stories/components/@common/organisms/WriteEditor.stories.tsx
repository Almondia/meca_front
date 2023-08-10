import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuillWriter from '@/components/@common/organisms/Editor/QuillWriter';

export default {
  title: 'components/@common/organisms/QuillWriter',
  component: QuillWriter,
  parameters: {
    componentSubtitle: 'WriteEditor',
    controls: {
      exclude: ['contents', 'setContents'],
    },
  },
} as ComponentMeta<typeof QuillWriter>;

const Template: ComponentStory<typeof QuillWriter> = (args) => {
  const [value, setValue] = useState<string>('');
  return <QuillWriter {...args} contents={value} setContents={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  maxHeight: '864px',
};
