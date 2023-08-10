import { useEffect, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoginDialog from '@/components/@common/organisms/LoginDialog';
import { DefaultModalOptions } from '@/types/common';

export default {
  title: 'components/@common/organisms/LoginDialog',
  component: LoginDialog,
} as ComponentMeta<typeof LoginDialog>;

const Template: ComponentStory<typeof LoginDialog> = ({ visible }: DefaultModalOptions) => {
  const [isVisible, setVisible] = useState(visible);
  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  return <LoginDialog visible={isVisible} onClose={() => setVisible(false)} />;
};

export const Default = Template.bind({});
Default.args = {
  visible: true,
};
