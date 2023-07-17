import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import QuillWriter, { EditorComponentProps } from '@/components/molcules/Editor/QuillWriter';
import { PostSection } from '@/styles/layout';

export default {
  title: 'components/molcules/QuillWriter',
  component: QuillWriter,
  parameters: {
    componentSubtitle: 'Write Editor',
    controls: {
      exclude: ['contents', 'setContents'],
    },
  },
} as ComponentMeta<typeof QuillWriter>;

const Template: ComponentStory<typeof QuillWriter> = (args: EditorComponentProps) => {
  const [value, setValue] = useState<string>('');
  return (
    <PostSection>
      <QuillWriter {...args} contents={value} setContents={setValue} />
    </PostSection>
  );
};

export const Default = Template.bind({});
Default.args = {
  maxHeight: '864px',
};
