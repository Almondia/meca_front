import { useEffect, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import LoginDialog from '@/components/molcules/LoginDialog';
import { DefaultModalOptions } from '@/types/common';

export default {
  title: 'components/molcules/LoginDialog',
  component: LoginDialog,
  parameters: {
    componentSubtitle: '로그인 모달',
  },
} as ComponentMeta<typeof LoginDialog>;

const Template: ComponentStory<typeof LoginDialog> = ({ visible, onClose }: DefaultModalOptions) => {
  const [isVisible, setVisible] = useState(visible);
  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  return <LoginDialog visible={isVisible} onClose={() => setVisible(false)} />;
};

export const Default = Template.bind({});
